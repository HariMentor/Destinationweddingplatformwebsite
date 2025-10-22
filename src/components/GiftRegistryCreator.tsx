import { useState } from "react";
import { motion } from "motion/react";
import { X, Gift, ArrowRight, DollarSign, Home, Plane, Heart } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";

interface GiftRegistryCreatorProps {
  onClose: () => void;
  onSave: (registryData: any) => void;
}

export function GiftRegistryCreator({ onClose, onSave }: GiftRegistryCreatorProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "Sarah & Michael's Wedding Registry",
    welcomeMessage: "Thank you for being part of our special day! Your love and support mean the world to us.",
    shippingAddress: "",
    allowCashGifts: true,
    honeymoonFundGoal: 5000,
  });

  const handleSubmit = () => {
    onSave({
      ...formData,
      createdDate: new Date().toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric", 
        year: "numeric" 
      }),
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full my-8"
      >
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <div>
            <h2 className="text-2xl mb-1" style={{ fontFamily: "Volkhov, serif" }}>
              Create Gift Registry
            </h2>
            <p className="text-sm text-muted-foreground">
              Step {step} of 2 - {step === 1 ? "Basic Information" : "Registry Settings"}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-6">
          <div className="flex items-center gap-2 mb-6">
            <div className={`flex-1 h-2 rounded-full ${step >= 1 ? "bg-[#DF6951]" : "bg-gray-200"}`} />
            <div className={`flex-1 h-2 rounded-full ${step >= 2 ? "bg-[#DF6951]" : "bg-gray-200"}`} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <div className="size-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="size-10 text-[#DF6951]" />
                </div>
                <h3 className="text-xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                  Registry Details
                </h3>
                <p className="text-sm text-muted-foreground">
                  Let's set up the basic information for your gift registry
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Registry Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Sarah & Michael's Wedding Registry"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="welcomeMessage">Welcome Message</Label>
                <Textarea
                  id="welcomeMessage"
                  value={formData.welcomeMessage}
                  onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
                  placeholder="A personal message to your guests..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shippingAddress">Shipping Address (Optional)</Label>
                <Textarea
                  id="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                  placeholder="123 Main Street, Apt 4B, City, State ZIP"
                  rows={2}
                />
                <p className="text-xs text-muted-foreground">
                  Guests can send gifts directly to this address
                </p>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <div className="size-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="size-10 text-[#DF6951]" />
                </div>
                <h3 className="text-xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                  Registry Preferences
                </h3>
                <p className="text-sm text-muted-foreground">
                  Customize your registry options
                </p>
              </div>

              {/* Cash Gifts Toggle */}
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="size-10 bg-[#DF6951] rounded-full flex items-center justify-center shrink-0">
                      <DollarSign className="size-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Allow Cash Gifts</h4>
                      <p className="text-sm text-muted-foreground">
                        Let guests contribute money toward your honeymoon or new home
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={formData.allowCashGifts}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, allowCashGifts: checked })
                    }
                  />
                </div>
              </Card>

              {/* Honeymoon Fund */}
              {formData.allowCashGifts && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-2"
                >
                  <Label htmlFor="honeymoonGoal" className="flex items-center gap-2">
                    <Plane className="size-4 text-[#DF6951]" />
                    Honeymoon Fund Goal (Optional)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="honeymoonGoal"
                      type="number"
                      value={formData.honeymoonFundGoal}
                      onChange={(e) =>
                        setFormData({ ...formData, honeymoonFundGoal: Number(e.target.value) })
                      }
                      className="pl-8"
                      placeholder="5000"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Set a goal for your honeymoon fund contributions
                  </p>
                </motion.div>
              )}

              {/* Registry Categories Preview */}
              <div className="space-y-3">
                <Label>Registry Categories</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Card className="p-3 text-center border-2 border-[#DF6951]">
                    <Plane className="size-8 mx-auto mb-2 text-[#DF6951]" />
                    <p className="text-sm font-semibold">Honeymoon</p>
                    <p className="text-xs text-muted-foreground">Experiences & travel</p>
                  </Card>
                  <Card className="p-3 text-center border-2 border-purple-300">
                    <Home className="size-8 mx-auto mb-2 text-purple-600" />
                    <p className="text-sm font-semibold">Home</p>
                    <p className="text-xs text-muted-foreground">Household items</p>
                  </Card>
                  <Card className="p-3 text-center border-2 border-blue-300">
                    <Heart className="size-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm font-semibold">Experiences</p>
                    <p className="text-xs text-muted-foreground">Activities & tours</p>
                  </Card>
                  <Card className="p-3 text-center border-2 border-green-300">
                    <DollarSign className="size-8 mx-auto mb-2 text-green-600" />
                    <p className="text-sm font-semibold">Cash Gifts</p>
                    <p className="text-xs text-muted-foreground">Monetary contributions</p>
                  </Card>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  You can add items to these categories after creating your registry
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t flex items-center justify-between bg-gray-50">
          <Button
            variant="outline"
            onClick={() => (step === 1 ? onClose() : setStep(1))}
          >
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          <div className="flex gap-2">
            {step === 1 ? (
              <Button
                onClick={() => setStep(2)}
                className="bg-[#DF6951] hover:bg-[#c5573d] gap-2"
                disabled={!formData.title.trim()}
              >
                Next Step
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-[#DF6951] hover:bg-[#c5573d] gap-2"
              >
                <Gift className="size-4" />
                Create Registry
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
