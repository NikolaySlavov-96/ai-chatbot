import { ChatbotUIContext } from "@/context/context"
import {
  PROFILE_CONTEXT_MAX,
  PROFILE_DISPLAY_NAME_MAX,
  PROFILE_USERNAME_MAX,
  PROFILE_USERNAME_MIN
} from "@/db/limits"
import { updateProfile } from "@/db/profile"
import { uploadProfileImage } from "@/db/storage/profile-images"
import { exportLocalStorageAsJSON } from "@/lib/export-old-data"
import { LLM_LIST_MAP } from "@/lib/models/llm/llm-list"
import { supabase } from "@/lib/supabase/browser-client"
import { cn } from "@/lib/utils"
import {
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconFileDownload,
  IconLoader2,
  IconLogout,
  IconUser
} from "@tabler/icons-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FC, useCallback, useContext, useRef, useState } from "react"
import { toast } from "sonner"
import { SIDEBAR_ICON_SIZE } from "../sidebar/sidebar-switcher"
import { Button } from "../ui/button"
import ImagePicker from "../ui/image-picker"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { LimitDisplay } from "../ui/limit-display"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { TextareaAutosize } from "../ui/textarea-autosize"
import { WithTooltip } from "../ui/with-tooltip"
import { ThemeSwitcher } from "./theme-switcher"

interface ProfileSettingsProps {}

export const ProfileSettings: FC<ProfileSettingsProps> = ({}) => {
  const { profile, setProfile, envKeyMap, setAvailableHostedModels } =
    useContext(ChatbotUIContext)

  const router = useRouter()

  const buttonRef = useRef<HTMLButtonElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  const [displayName, setDisplayName] = useState(profile?.display_name || "")
  const [username, setUsername] = useState(profile?.username || "")
  const [usernameAvailable, setUsernameAvailable] = useState(true)
  const [loadingUsername, setLoadingUsername] = useState(false)
  const [profileImageSrc, setProfileImageSrc] = useState(
    profile?.image_url || ""
  )
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const [profileInstructions, setProfileInstructions] = useState(
    profile?.profile_context || ""
  )

  const [openaiAPIKey, setOpenaiAPIKey] = useState(
    profile?.openai_api_key || ""
  )
  const [anthropicAPIKey, setAnthropicAPIKey] = useState(
    profile?.anthropic_api_key || ""
  )
  const [googleGeminiAPIKey, setGoogleGeminiAPIKey] = useState(
    profile?.google_gemini_api_key || ""
  )
  const [mistralAPIKey, setMistralAPIKey] = useState(
    profile?.mistral_api_key || ""
  )
  const [groqAPIKey, setGroqAPIKey] = useState(profile?.groq_api_key || "")
  const [perplexityAPIKey, setPerplexityAPIKey] = useState(
    profile?.perplexity_api_key || ""
  )
  const [xAiAPIKey, setXAiAPIKey] = useState(profile?.xAi_api_key || "")

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
    return
  }

  const handleSave = async () => {
    if (!profile) return
    let profileImageUrl = profile.image_url
    let profileImagePath = ""

    if (profileImageFile) {
      const { path, url } = await uploadProfileImage(profile, profileImageFile)
      profileImageUrl = url ?? profileImageUrl
      profileImagePath = path
    }

    const updatedProfile = await updateProfile(profile.id, {
      ...profile,
      display_name: displayName,
      username,
      profile_context: profileInstructions,
      image_url: profileImageUrl,
      image_path: profileImagePath,
      openai_api_key: openaiAPIKey,
      xAi_api_key: xAiAPIKey,
      anthropic_api_key: anthropicAPIKey,
      google_gemini_api_key: googleGeminiAPIKey,
      mistral_api_key: mistralAPIKey,
      groq_api_key: groqAPIKey,
      perplexity_api_key: perplexityAPIKey
    })

    setProfile(updatedProfile)

    toast.success("Profile updated!")

    const providers = [
      "openai",
      "google",
      "anthropic",
      "mistral",
      "groq",
      "perplexity",
      "xAi"
    ]

    providers.forEach(async provider => {
      let providerKey: keyof typeof profile

      if (provider === "google") {
        providerKey = "google_gemini_api_key"
      } else {
        providerKey = `${provider}_api_key` as keyof typeof profile
      }

      const models = LLM_LIST_MAP[provider]
      const envKeyActive = envKeyMap[provider]

      if (!envKeyActive) {
        const hasApiKey = !!updatedProfile[providerKey]
        if (hasApiKey && Array.isArray(models)) {
          setAvailableHostedModels(prev => {
            const newModels = models.filter(
              model =>
                !prev.some(prevModel => prevModel.modelId === model.modelId)
            )
            return [...prev, ...newModels]
          })
        } else if (!hasApiKey && Array.isArray(models)) {
          setAvailableHostedModels(prev =>
            prev.filter(model => !models.includes(model))
          )
        }
      }
    })

    setIsOpen(false)
  }

  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout | null

    return (...args: any[]) => {
      const later = () => {
        if (timeout) clearTimeout(timeout)
        func(...args)
      }

      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  const checkUsernameAvailability = useCallback(
    debounce(async (username: string) => {
      if (!username) return

      if (username.length < PROFILE_USERNAME_MIN) {
        setUsernameAvailable(false)
        return
      }

      if (username.length > PROFILE_USERNAME_MAX) {
        setUsernameAvailable(false)
        return
      }

      const usernameRegex = /^[a-zA-Z0-9_]+$/
      if (!usernameRegex.test(username)) {
        setUsernameAvailable(false)
        toast.error(
          "Username must be letters, numbers, or underscores only - no other characters or spacing allowed."
        )
        return
      }

      setLoadingUsername(true)

      const response = await fetch(`/api/username/available`, {
        method: "POST",
        body: JSON.stringify({ username })
      })

      const data = await response.json()
      const isAvailable = data.isAvailable

      setUsernameAvailable(isAvailable)

      if (username === profile?.username) {
        setUsernameAvailable(true)
      }

      setLoadingUsername(false)
    }, 500),
    []
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      buttonRef.current?.click()
    }
  }

  if (!profile) return null

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {profile.image_url ? (
          <Image
            className="mt-2 size-[34px] cursor-pointer rounded hover:opacity-50"
            src={profile.image_url + "?" + new Date().getTime()}
            height={34}
            width={34}
            alt={"Image"}
          />
        ) : (
          <Button size="icon" variant="ghost">
            <IconUser size={SIDEBAR_ICON_SIZE} />
          </Button>
        )}
      </SheetTrigger>

      <SheetContent
        className="flex flex-col justify-between"
        side="left"
        onKeyDown={handleKeyDown}
      >
        <div className="grow overflow-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between space-x-2">
              <div>User Settings</div>

              <Button
                tabIndex={-1}
                className="text-xs"
                size="sm"
                onClick={handleSignOut}
              >
                <IconLogout className="mr-1" size={20} />
                Logout
              </Button>
            </SheetTitle>
          </SheetHeader>

          <Tabs defaultValue="profile">
            <TabsList className="mt-4 grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="keys">API Keys</TabsTrigger>
              {/*  */}
            </TabsList>

            <TabsContent className="mt-4 space-y-4" value="profile">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Label>Username</Label>

                  <div className="text-xs">
                    {username !== profile.username ? (
                      usernameAvailable ? (
                        <div className="text-green-500">AVAILABLE</div>
                      ) : (
                        <div className="text-red-500">UNAVAILABLE</div>
                      )
                    ) : null}
                  </div>
                </div>

                <div className="relative">
                  <Input
                    className="pr-10"
                    placeholder="Username..."
                    value={username}
                    onChange={e => {
                      setUsername(e.target.value)
                      checkUsernameAvailability(e.target.value)
                    }}
                    minLength={PROFILE_USERNAME_MIN}
                    maxLength={PROFILE_USERNAME_MAX}
                  />

                  {username !== profile.username ? (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      {loadingUsername ? (
                        <IconLoader2 className="animate-spin" />
                      ) : usernameAvailable ? (
                        <IconCircleCheckFilled className="text-green-500" />
                      ) : (
                        <IconCircleXFilled className="text-red-500" />
                      )}
                    </div>
                  ) : null}
                </div>

                <LimitDisplay
                  used={username.length}
                  limit={PROFILE_USERNAME_MAX}
                />
              </div>

              <div className="space-y-1">
                <Label>Profile Image</Label>

                <ImagePicker
                  src={profileImageSrc}
                  image={profileImageFile}
                  height={50}
                  width={50}
                  onSrcChange={setProfileImageSrc}
                  onImageChange={setProfileImageFile}
                />
              </div>

              <div className="space-y-1">
                <Label>Chat Display Name</Label>

                <Input
                  placeholder="Chat display name..."
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  maxLength={PROFILE_DISPLAY_NAME_MAX}
                />
              </div>

              <div className="space-y-1">
                <Label className="text-sm">
                  What would you like the AI to know about you to provide better
                  responses?
                </Label>

                <TextareaAutosize
                  value={profileInstructions}
                  onValueChange={setProfileInstructions}
                  placeholder="Profile context... (optional)"
                  minRows={6}
                  maxRows={10}
                />

                <LimitDisplay
                  used={profileInstructions.length}
                  limit={PROFILE_CONTEXT_MAX}
                />
              </div>
            </TabsContent>

            <TabsContent className="mt-4 space-y-4" value="keys">
              <div className="mt-5 space-y-2">
                <>
                  {envKeyMap["openai"] ? (
                    <Label>OpenAI API key set by admin.</Label>
                  ) : (
                    <Input
                      placeholder="OpenAI API Key"
                      type="password"
                      value={openaiAPIKey}
                      onChange={e => setOpenaiAPIKey(e.target.value)}
                    />
                  )}
                </>
              </div>

              <div className="space-y-1">
                {envKeyMap["anthropic"] ? (
                  <Label>Anthropic API key set by admin.</Label>
                ) : (
                  <>
                    <Label>Anthropic API Key</Label>
                    <Input
                      placeholder="Anthropic API Key"
                      type="password"
                      value={anthropicAPIKey}
                      onChange={e => setAnthropicAPIKey(e.target.value)}
                    />
                  </>
                )}
              </div>

              <div className="space-y-1">
                {envKeyMap["google"] ? (
                  <Label>Google Gemini API key set by admin.</Label>
                ) : (
                  <>
                    <Label>Google Gemini API Key</Label>
                    <Input
                      placeholder="Google Gemini API Key"
                      type="password"
                      value={googleGeminiAPIKey}
                      onChange={e => setGoogleGeminiAPIKey(e.target.value)}
                    />
                  </>
                )}
              </div>

              <div className="space-y-1">
                {envKeyMap["mistral"] ? (
                  <Label>Mistral API key set by admin.</Label>
                ) : (
                  <>
                    <Label>Mistral API Key</Label>
                    <Input
                      placeholder="Mistral API Key"
                      type="password"
                      value={mistralAPIKey}
                      onChange={e => setMistralAPIKey(e.target.value)}
                    />
                  </>
                )}
              </div>

              <div className="space-y-1">
                {envKeyMap["groq"] ? (
                  <Label>Groq API key set by admin.</Label>
                ) : (
                  <>
                    <Label>Groq API Key</Label>
                    <Input
                      placeholder="Groq API Key"
                      type="password"
                      value={groqAPIKey}
                      onChange={e => setGroqAPIKey(e.target.value)}
                    />
                  </>
                )}
              </div>

              <div className="space-y-1">
                {envKeyMap["perplexity"] ? (
                  <Label>Perplexity API key set by admin.</Label>
                ) : (
                  <>
                    <Label>Perplexity API Key</Label>
                    <Input
                      placeholder="Perplexity API Key"
                      type="password"
                      value={perplexityAPIKey}
                      onChange={e => setPerplexityAPIKey(e.target.value)}
                    />
                  </>
                )}
              </div>

              <div className="space-y-1">
                {envKeyMap["xAi"] ? (
                  <Label>X Ai API key set by admin.</Label>
                ) : (
                  <>
                    <Label>X Ai API Key</Label>
                    <Input
                      placeholder="x Ai API Key"
                      type="password"
                      value={perplexityAPIKey}
                      onChange={e => setXAiAPIKey(e.target.value)}
                    />
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-6 flex items-center">
          <div className="flex items-center space-x-1">
            <ThemeSwitcher />

            <WithTooltip
              display={
                <div>
                  Download NNSN AI 1.0 data as JSON. Import coming soon!
                </div>
              }
              trigger={
                <IconFileDownload
                  className="cursor-pointer hover:opacity-50"
                  size={32}
                  onClick={exportLocalStorageAsJSON}
                />
              }
            />
          </div>

          <div className="ml-auto space-x-2">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>

            <Button ref={buttonRef} onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
