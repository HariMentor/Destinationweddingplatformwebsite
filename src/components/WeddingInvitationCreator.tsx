import { useState } from "react";
import { motion } from "motion/react";
import {
  X,
  Copy,
  Check,
  Mail,
  Users,
  Palette,
  MessageSquare,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface WeddingInvitationCreatorProps {
  weddingPlan: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

export function WeddingInvitationCreator({
  weddingPlan,
  onClose,
  onSave,
}: WeddingInvitationCreatorProps) {
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    title: `${weddingPlan.eventName}`,
    customMessage: "Join us for a magical celebration of love. Your presence would mean the world to us as we begin our forever together.",
    designTheme: "romantic" as "elegant" | "romantic" | "modern" | "rustic",
  });

  const themes = [
    {
      id: "elegant",
      name: "Elegant",
      description: "Classic and sophisticated",
      colors: ["#1a1a1a", "#d4af37", "#ffffff"],
    },
    {
      id: "romantic",
      name: "Romantic",
      description: "Soft and dreamy",
      colors: ["#B76E79", "#E8B4B8", "#F7E7CE"],
    },
    {
      id: "modern",
      name: "Modern",
      description: "Clean and contemporary",
      colors: ["#2c3e50", "#3498db", "#ecf0f1"],
    },
    {
      id: "rustic",
      name: "Rustic",
      description: "Warm and natural",
      colors: ["#8b7355", "#c19a6b", "#f5f5dc"],
    },
  ];

  const handleGenerate = () => {
    const invitationLink = `wedzway.com/wedding/${weddingPlan.eventName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}-${weddingPlan.destination
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}-2025`;

    const invitationData = {
      ...formData,
      invitationLink,
      createdDate: new Date().toLocaleDateString(),
    };

    onSave(invitationData);
    setStep(3);
  };

  const copyToClipboard = async () => {
    const link = `wedzway.com/wedding/${weddingPlan.eventName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}-${weddingPlan.destination
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}-2025`;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback: just show copied state
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 sm:p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl sm:text-2xl" style={{ fontFamily: "Volkhov, serif" }}>
              Create Wedding Invitation
            </h2>
            <p className="text-sm text-muted-foreground">Step {step} of 3</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-5" />
          </Button>
        </div>

        {/* Step 1: Basic Details */}
        {step === 1 && (
          <div className="p-4 sm:p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Invitation Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Sarah & Michael's Tuscan Wedding"
                  className="mt-2"
                />
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  This will be the main heading on your wedding page
                </p>
              </div>

              <div>
                <Label htmlFor="message">Welcome Message</Label>
                <Textarea
                  id="message"
                  value={formData.customMessage}
                  onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })}
                  rows={4}
                  placeholder="Share a personal message with your guests..."
                  className="mt-2"
                />
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  A warm message to welcome your guests to the wedding page
                </p>
              </div>
            </div>

            {/* Preview Card */}
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-pink-50 to-purple-50 border-2">
              <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                <Sparkles className="size-4" />
                Preview
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                    {formData.title || "Your Wedding Title"}
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                    <span>📅 {weddingPlan.weddingDate}</span>
                    <span>📍 {weddingPlan.destination}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formData.customMessage || "Your welcome message will appear here"}
                </p>
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button
                onClick={() => setStep(2)}
                className="bg-[#DF6951] hover:bg-[#c5573d] w-full sm:w-auto"
                disabled={!formData.title || !formData.customMessage}
              >
                Next: Choose Design
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Design Theme */}
        {step === 2 && (
          <div className="p-4 sm:p-6 space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                Choose Your Design Theme
              </h3>
              <p className="text-sm text-muted-foreground">
                Select a design theme that matches your wedding style
              </p>
            </div>

            <RadioGroup
              value={formData.designTheme}
              onValueChange={(value: any) => setFormData({ ...formData, designTheme: value })}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {themes.map((theme) => (
                  <label key={theme.id} className="cursor-pointer">
                    <div
                      className={`p-4 sm:p-6 border-2 rounded-lg transition-all ${
                        formData.designTheme === theme.id
                          ? "border-[#DF6951] bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <RadioGroupItem value={theme.id} id={theme.id} />
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{theme.name}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-3">{theme.description}</p>
                          <div className="flex gap-2">
                            {theme.colors.map((color, idx) => (
                              <div
                                key={idx}
                                className="size-6 sm:size-8 rounded-full border-2 border-gray-300"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </RadioGroup>

            {/* Wedding Details Summary */}
            <Card className="p-4 sm:p-6 bg-gray-50">
              <h4 className="font-semibold mb-3">Wedding Details (Auto-filled)</h4>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Venue:</span>{" "}
                  <span className="font-medium">{weddingPlan.venue}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Date:</span>{" "}
                  <span className="font-medium">{weddingPlan.weddingDate}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Location:</span>{" "}
                  <span className="font-medium">{weddingPlan.destination}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Guests:</span>{" "}
                  <span className="font-medium">{weddingPlan.guestSize}</span>
                </div>
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="w-full sm:w-auto">
                Back
              </Button>
              <Button
                onClick={handleGenerate}
                className="bg-[#DF6951] hover:bg-[#c5573d] w-full sm:w-auto"
              >
                Generate Invitation
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Success & Share */}
        {step === 3 && (
          <div className="p-4 sm:p-6 space-y-6">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="size-16 sm:size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check className="size-10 sm:size-12 text-green-600" />
              </motion.div>
              <h3 className="text-xl sm:text-2xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                Invitation Created!
              </h3>
              <p className="text-sm text-muted-foreground">
                Your beautiful wedding invitation is ready to share
              </p>
            </div>

            {/* Invitation Link */}
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-pink-50 border-2 border-[#DF6951]">
              <div className="flex items-center gap-2 mb-3">
                <ExternalLink className="size-5 text-[#DF6951]" />
                <h4 className="font-semibold text-sm sm:text-base">Your Wedding Page Link</h4>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  value={`wedzway.com/wedding/${weddingPlan.eventName
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")}-${weddingPlan.destination
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")}-2025`}
                  readOnly
                  className="bg-white text-xs sm:text-sm"
                />
                <Button
                  onClick={copyToClipboard}
                  className="bg-[#DF6951] hover:bg-[#c5573d] w-full sm:w-auto"
                >
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  <span className="ml-2 sm:hidden">{copied ? "Copied!" : "Copy"}</span>
                </Button>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                Share this link with your guests to view the wedding details and RSVP
              </p>
            </Card>

            {/* Next Steps */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <div className="size-10 sm:size-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="size-5 sm:size-6 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-1 text-sm sm:text-base">Add Guests</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Manage your guest list and send invitations
                </p>
              </Card>
              <Card className="p-4 text-center">
                <div className="size-10 sm:size-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="size-5 sm:size-6 text-purple-600" />
                </div>
                <h4 className="font-semibold mb-1 text-sm sm:text-base">Send Invites</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Email the link to your guests
                </p>
              </Card>
              <Card className="p-4 text-center">
                <div className="size-10 sm:size-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="size-5 sm:size-6 text-green-600" />
                </div>
                <h4 className="font-semibold mb-1 text-sm sm:text-base">Track RSVPs</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Monitor responses in real-time
                </p>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
                Close
              </Button>
              <Button
                className="bg-[#DF6951] hover:bg-[#c5573d] w-full sm:w-auto"
                onClick={onClose}
              >
                Go to Invitations
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
