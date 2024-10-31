"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export default function EmailTagsInput({ onEmailsChange }: { onEmailsChange: (emails: string[]) => void }) {
  const [emails, setEmails] = React.useState<string[]>([])
  const [inputValue, setInputValue] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleEmailsChange = (newEmails: string[]) => {
    setEmails(newEmails);
    onEmailsChange(newEmails);
  };

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  }

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" || e.key === ",") {
//       e.preventDefault()
//       const email = inputValue.trim()

//       if (email && validateEmail(email) && !emails.includes(email)) {
//         setEmails([...emails, email])
//         setInputValue("")
//       }
//     } else if (e.key === "Backspace" && !inputValue && emails.length > 0) {
//       e.preventDefault()
//       const newEmails = [...emails]
//       newEmails.pop()
//       setEmails(newEmails)
//     }
//   }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
        e.preventDefault();
        const email = inputValue.trim();
        if (email && validateEmail(email) && !emails.includes(email)) {
            handleEmailsChange([...emails, email]);
            setInputValue("");
        }
    } else if (e.key === "Backspace" && !inputValue && emails.length > 0) {
        handleEmailsChange(emails.slice(0, -1));
    }
  };

  const removeEmail = (emailToRemove: string) => {
    handleEmailsChange(emails.filter((email) => email !== emailToRemove));
  };

  return (
    <div className="w-[40.81rem]">
      <div
        className={cn("flex min-h-[40px] w-[40.81rem] flex-wrap gap-2 rounded-lg border border-borderColor py-3 px-8 font-DMSans text-lg")}
        onClick={() => inputRef.current?.focus()}
      >
        {emails.map((email) => (
          <Badge
            key={email}
            variant="outline"
            className="rounded-full px-2 text-[#919191] text-base font-light flex gap-x-1"
          >
            <div className="bg-[#DADADA] rounded-full p-2" />
            {email}
            <button
              type="button"
              className="rounded-full outline-none "
              onClick={() => removeEmail(email)}
            >
              <X className="h-3 w-3 " />
              <span className="sr-only">Remove {email}</span>
            </button>
          </Badge>
        ))}
        <input
          ref={inputRef}
          type="email"
          value={inputValue}
          className={cn(
            "flex-1 outline-none placeholder-grayColor/70 text-inputTextColor text-lg",
            !emails.length && "w-full"
          )}
          placeholder={emails.length === 0 ? "Enter email addresses" : ""}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}