"use client";

import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Copy, CheckCircle2, Eye, Code, Mail } from "lucide-react";
import { toast } from "sonner";

interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  html: string;
  variables: string[];
}

const emailTemplates: EmailTemplate[] = [
  {
    id: "booking-confirmation",
    name: "Booking Confirmation",
    description: "Sent when a venue, planner, or vendor booking is confirmed",
    category: "Bookings",
    variables: ["customerName", "itemName", "bookingReference", "eventDate", "amount"],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f7f7f7;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f7f7f7;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff;">
          
          <!-- Logo -->
          <tr>
            <td style="padding: 40px 40px 30px;">
              <h1 style="margin: 0; color: #DF6951; font-family: serif; font-size: 24px; font-weight: 400;">Wedzway</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 15px; line-height: 1.5;">Hi {{customerName}},</p>
              
              <p style="margin: 0 0 24px; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                Your booking for <strong>{{itemName}}</strong> has been confirmed.
              </p>
              
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="color: #6b7280; font-size: 13px;">Booking Reference</td>
                        <td align="right" style="color: #1a1a1a; font-size: 13px; font-family: monospace;">{{bookingReference}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="color: #6b7280; font-size: 13px;">Event Date</td>
                        <td align="right" style="color: #1a1a1a; font-size: 13px;">{{eventDate}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="color: #6b7280; font-size: 13px;">Amount Paid</td>
                        <td align="right" style="color: #1a1a1a; font-size: 13px; font-weight: 600;">{{amount}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 32px 0;">
                <tr>
                  <td>
                    <a href="https://wedzway.com/account" style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px;">View Booking Details</a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 32px 0 0; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                Thanks,<br/>
                Wedzway team
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; line-height: 1.5;">
                This email was sent to <a href="mailto:contact@wedzway.com" style="color: #3b82f6; text-decoration: none;">contact@wedzway.com</a>. If you'd rather not receive this kind of email, you can <a href="#" style="color: #3b82f6; text-decoration: none;">unsubscribe</a> or <a href="#" style="color: #3b82f6; text-decoration: none;">manage your email preferences</a>.
              </p>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 11px;">© 2025 Wedzway. All rights reserved.</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  },
  {
    id: "payment-confirmation",
    name: "Payment Confirmation",
    description: "Sent when a payment is successfully processed",
    category: "Payments",
    variables: ["customerName", "amount", "transactionId", "paymentMethod", "paymentDate", "itemName"],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f7f7f7;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f7f7f7;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff;">
          
          <!-- Logo -->
          <tr>
            <td style="padding: 40px 40px 30px;">
              <h1 style="margin: 0; color: #DF6951; font-family: serif; font-size: 24px; font-weight: 400;">Wedzway</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 15px; line-height: 1.5;">Hi {{customerName}},</p>
              
              <p style="margin: 0 0 24px; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                Your payment of <strong>{{amount}}</strong> has been successfully processed.
              </p>
              
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="color: #6b7280; font-size: 13px;">Transaction ID</td>
                        <td align="right" style="color: #1a1a1a; font-size: 13px; font-family: monospace;">{{transactionId}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="color: #6b7280; font-size: 13px;">Payment Date</td>
                        <td align="right" style="color: #1a1a1a; font-size: 13px;">{{paymentDate}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="color: #6b7280; font-size: 13px;">Payment Method</td>
                        <td align="right" style="color: #1a1a1a; font-size: 13px;">{{paymentMethod}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="color: #6b7280; font-size: 13px;">Item</td>
                        <td align="right" style="color: #1a1a1a; font-size: 13px;">{{itemName}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 32px 0;">
                <tr>
                  <td>
                    <a href="https://wedzway.com/invoices/{{transactionId}}" style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px;">Download Invoice</a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 32px 0 0; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                Thanks,<br/>
                Wedzway team
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; line-height: 1.5;">
                This email was sent to <a href="mailto:contact@wedzway.com" style="color: #3b82f6; text-decoration: none;">contact@wedzway.com</a>. If you'd rather not receive this kind of email, you can <a href="#" style="color: #3b82f6; text-decoration: none;">unsubscribe</a> or <a href="#" style="color: #3b82f6; text-decoration: none;">manage your email preferences</a>.
              </p>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 11px;">© 2025 Wedzway. All rights reserved.</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  },
  {
    id: "bank-transfer-instructions",
    name: "Bank Transfer Instructions",
    description: "Sent with bank account details for direct bank transfer",
    category: "Payments",
    variables: ["customerName", "amount", "bookingReference", "bankName", "accountNumber", "swiftCode", "accountHolder", "reference"],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bank Transfer Instructions</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f7f7f7;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f7f7f7;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff;">
          
          <!-- Logo -->
          <tr>
            <td style="padding: 40px 40px 30px;">
              <h1 style="margin: 0; color: #DF6951; font-family: serif; font-size: 24px; font-weight: 400;">Wedzway</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 15px; line-height: 1.5;">Hi {{customerName}},</p>
              
              <p style="margin: 0 0 24px; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                To complete your booking (Reference: <strong>{{bookingReference}}</strong>), please transfer <strong>{{amount}}</strong> to the following bank account:
              </p>
              
              <!-- Bank Details -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px;">
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="color: #6b7280; font-size: 13px; width: 40%;">Bank Name</td>
                              <td style="color: #1a1a1a; font-size: 13px; font-weight: 600;">{{bankName}}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="color: #6b7280; font-size: 13px; width: 40%;">Account Number</td>
                              <td style="color: #1a1a1a; font-size: 13px; font-family: monospace; font-weight: 600;">{{accountNumber}}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="color: #6b7280; font-size: 13px; width: 40%;">SWIFT/BIC</td>
                              <td style="color: #1a1a1a; font-size: 13px; font-family: monospace; font-weight: 600;">{{swiftCode}}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="color: #6b7280; font-size: 13px; width: 40%;">Account Holder</td>
                              <td style="color: #1a1a1a; font-size: 13px; font-weight: 600;">{{accountHolder}}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="color: #6b7280; font-size: 13px; width: 40%;">Reference</td>
                              <td style="color: #ef4444; font-size: 13px; font-family: monospace; font-weight: 700;">{{reference}}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 24px 0; color: #6b7280; font-size: 13px; line-height: 1.6;">
                <strong style="color: #1a1a1a;">Important:</strong> Please include the reference number in your transfer and upload your payment proof after completing the transfer. Processing time: 2-5 business days.
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 32px 0;">
                <tr>
                  <td>
                    <a href="https://wedzway.com/account/payments" style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px;">Upload Payment Proof</a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 32px 0 0; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                Thanks,<br/>
                Wedzway team
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; line-height: 1.5;">
                This email was sent to <a href="mailto:contact@wedzway.com" style="color: #3b82f6; text-decoration: none;">contact@wedzway.com</a>. If you'd rather not receive this kind of email, you can <a href="#" style="color: #3b82f6; text-decoration: none;">unsubscribe</a> or <a href="#" style="color: #3b82f6; text-decoration: none;">manage your email preferences</a>.
              </p>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 11px;">© 2025 Wedzway. All rights reserved.</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  },
  {
    id: "bank-transfer-verified",
    name: "Bank Transfer Verified",
    description: "Sent when bank transfer payment is verified",
    category: "Payments",
    variables: ["customerName", "amount", "bookingReference", "verificationDate"],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Verified</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f7f7f7;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f7f7f7;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff;">
          
          <!-- Logo -->
          <tr>
            <td style="padding: 40px 40px 30px;">
              <h1 style="margin: 0; color: #DF6951; font-family: serif; font-size: 24px; font-weight: 400;">Wedzway</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 15px; line-height: 1.5;">Hi {{customerName}},</p>
              
              <p style="margin: 0 0 24px; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                Great news! We've successfully verified your bank transfer payment of <strong>{{amount}}</strong> for booking reference <strong>{{bookingReference}}</strong>.
              </p>
              
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0; background-color: #f0fdf4; border: 1px solid #86efac; border-radius: 6px;">
                <tr>
                  <td style="padding: 16px;">
                    <p style="margin: 0; color: #166534; font-size: 13px;">
                      <strong>✓ Payment Verified</strong> on {{verificationDate}}
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 24px 0; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                Your booking is now fully confirmed and all services are secured.
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 32px 0;">
                <tr>
                  <td>
                    <a href="https://wedzway.com/account" style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px;">View Booking Details</a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 32px 0 0; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                Thanks,<br/>
                Wedzway team
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; line-height: 1.5;">
                This email was sent to <a href="mailto:contact@wedzway.com" style="color: #3b82f6; text-decoration: none;">contact@wedzway.com</a>. If you'd rather not receive this kind of email, you can <a href="#" style="color: #3b82f6; text-decoration: none;">unsubscribe</a> or <a href="#" style="color: #3b82f6; text-decoration: none;">manage your email preferences</a>.
              </p>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 11px;">© 2025 Wedzway. All rights reserved.</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  },
  {
    id: "bank-transfer-rejected",
    name: "Bank Transfer Rejected",
    description: "Sent when uploaded bank transfer proof is rejected",
    category: "Payments",
    variables: ["customerName", "bookingReference", "rejectionReason"],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Proof Rejected</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f7f7f7;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f7f7f7;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff;">
          
          <!-- Logo -->
          <tr>
            <td style="padding: 40px 40px 30px;">
              <h1 style="margin: 0; color: #DF6951; font-family: serif; font-size: 24px; font-weight: 400;">Wedzway</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 15px; line-height: 1.5;">Hi {{customerName}},</p>
              
              <p style="margin: 0 0 24px; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                We were unable to verify your bank transfer proof for booking reference <strong>{{bookingReference}}</strong>.
              </p>
              
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0; background-color: #fef2f2; border: 1px solid #fca5a5; border-radius: 6px;">
                <tr>
                  <td style="padding: 16px;">
                    <p style="margin: 0 0 8px; color: #991b1b; font-size: 13px; font-weight: 600;">Reason for Rejection:</p>
                    <p style="margin: 0; color: #7f1d1d; font-size: 13px; line-height: 1.5;">{{rejectionReason}}</p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 24px 0; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                Please upload a clear copy of your bank transfer confirmation that includes the transaction details, amount, date, and reference number.
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 32px 0;">
                <tr>
                  <td>
                    <a href="https://wedzway.com/account/payments" style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px;">Re-upload Payment Proof</a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 32px 0 0; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                Thanks,<br/>
                Wedzway team
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; line-height: 1.5;">
                This email was sent to <a href="mailto:contact@wedzway.com" style="color: #3b82f6; text-decoration: none;">contact@wedzway.com</a>. If you'd rather not receive this kind of email, you can <a href="#" style="color: #3b82f6; text-decoration: none;">unsubscribe</a> or <a href="#" style="color: #3b82f6; text-decoration: none;">manage your email preferences</a>.
              </p>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 11px;">© 2025 Wedzway. All rights reserved.</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  },
  {
    id: "welcome-email",
    name: "Welcome Email",
    description: "Sent when a new user signs up",
    category: "Account",
    variables: ["customerName"],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Wedzway</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f7f7f7;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f7f7f7;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff;">
          
          <!-- Logo -->
          <tr>
            <td style="padding: 40px 40px 20px;">
              <h1 style="margin: 0; color: #DF6951; font-family: serif; font-size: 24px; font-weight: 400;">Wedzway</h1>
            </td>
          </tr>
          
          <!-- Banner Image -->
          <tr>
            <td style="padding: 0; overflow: hidden; max-height: 350px;">
              <img src="https://images.unsplash.com/photo-1760669336713-17e4d2cf4e39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMHdlZGRpbmclMjBkZXN0aW5hdGlvbiUyMGJlYWNofGVufDF8fHx8MTc2MTIyNzk0MXww&ixlib=rb-4.1.0&q=80&w=1080" alt="Welcome to Wedzway - Beautiful wedding destination" width="600" style="display: block; width: 100%; max-width: 600px; height: 350px; object-fit: cover; object-position: center; border: 0;" />
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 40px 40px;">
              <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 15px; line-height: 1.5;">Hi {{customerName}},</p>
              
              <p style="margin: 0 0 24px; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                Welcome to Wedzway! We're thrilled to have you join us as you plan your dream destination wedding.
              </p>
              
              <p style="margin: 0 0 24px; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                With Wedzway, you can discover stunning venues, connect with verified vendors, and plan every detail of your special day—all in one place.
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 32px 0;">
                <tr>
                  <td>
                    <a href="https://wedzway.com" style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px;">Start Planning Your Wedding</a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 32px 0 0; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                Thanks,<br/>
                Wedzway team
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; line-height: 1.5;">
                This email was sent to <a href="mailto:contact@wedzway.com" style="color: #3b82f6; text-decoration: none;">contact@wedzway.com</a>. If you'd rather not receive this kind of email, you can <a href="#" style="color: #3b82f6; text-decoration: none;">unsubscribe</a> or <a href="#" style="color: #3b82f6; text-decoration: none;">manage your email preferences</a>.
              </p>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 11px;">© 2025 Wedzway. All rights reserved.</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  },
  {
    id: "booking-reminder",
    name: "Booking Reminder",
    description: "Sent as a reminder before the event date",
    category: "Bookings",
    variables: ["customerName", "itemName", "eventDate", "daysUntil", "bookingReference"],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Reminder</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f7f7f7;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f7f7f7;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff;">
          
          <!-- Logo -->
          <tr>
            <td style="padding: 40px 40px 30px;">
              <h1 style="margin: 0; color: #DF6951; font-family: serif; font-size: 24px; font-weight: 400;">Wedzway</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 15px; line-height: 1.5;">Hi {{customerName}},</p>
              
              <p style="margin: 0 0 24px; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                Just a friendly reminder that your event with <strong>{{itemName}}</strong> is scheduled for <strong>{{eventDate}}</strong> — that's only <strong>{{daysUntil}} days</strong> away!
              </p>
              
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0;">
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="color: #6b7280; font-size: 13px;">Booking Reference</td>
                        <td align="right" style="color: #1a1a1a; font-size: 13px; font-family: monospace;">{{bookingReference}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 32px 0;">
                <tr>
                  <td>
                    <a href="https://wedzway.com/account" style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px;">View Booking Details</a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 32px 0 0; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                Thanks,<br/>
                Wedzway team
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; line-height: 1.5;">
                This email was sent to <a href="mailto:contact@wedzway.com" style="color: #3b82f6; text-decoration: none;">contact@wedzway.com</a>. If you'd rather not receive this kind of email, you can <a href="#" style="color: #3b82f6; text-decoration: none;">unsubscribe</a> or <a href="#" style="color: #3b82f6; text-decoration: none;">manage your email preferences</a>.
              </p>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 11px;">© 2025 Wedzway. All rights reserved.</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  },
  {
    id: "otp-verification",
    name: "OTP Verification",
    description: "Sent with one-time password for authentication",
    category: "Account",
    variables: ["customerName", "otpCode", "expiryTime"],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Verification Code</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f7f7f7;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f7f7f7;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff;">
          
          <!-- Logo -->
          <tr>
            <td style="padding: 40px 40px 30px;">
              <h1 style="margin: 0; color: #DF6951; font-family: serif; font-size: 24px; font-weight: 400;">Wedzway</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 15px; line-height: 1.5;">Hi {{customerName}},</p>
              
              <p style="margin: 0 0 24px; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                Use the following verification code to complete your sign-in:
              </p>
              
              <!-- OTP Code Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <div style="display: inline-block; background-color: #f9fafb; border: 2px solid #e5e7eb; border-radius: 8px; padding: 24px 48px;">
                      <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Verification Code</p>
                      <p style="margin: 12px 0 0; color: #1a1a1a; font-size: 36px; font-weight: 700; letter-spacing: 8px; font-family: 'Courier New', monospace;">{{otpCode}}</p>
                    </div>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 24px 0; color: #6b7280; font-size: 13px; line-height: 1.6;">
                This code will expire in <strong>{{expiryTime}}</strong>. If you didn't request this code, please ignore this email or contact our support team.
              </p>
              
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0; background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 6px;">
                <tr>
                  <td style="padding: 16px;">
                    <p style="margin: 0; color: #92400e; font-size: 13px; line-height: 1.5;">
                      <strong>⚠️ Security Notice:</strong> Never share this code with anyone. Wedzway staff will never ask for your verification code.
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 32px 0 0; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                Thanks,<br/>
                Wedzway team
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; line-height: 1.5;">
                This email was sent to <a href="mailto:contact@wedzway.com" style="color: #3b82f6; text-decoration: none;">contact@wedzway.com</a>. If you'd rather not receive this kind of email, you can <a href="#" style="color: #3b82f6; text-decoration: none;">unsubscribe</a> or <a href="#" style="color: #3b82f6; text-decoration: none;">manage your email preferences</a>.
              </p>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 11px;">© 2025 Wedzway. All rights reserved.</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  },
  {
    id: "password-reset",
    name: "Password Reset",
    description: "Sent when user requests password reset",
    category: "Account",
    variables: ["customerName", "resetLink", "expiryTime"],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f7f7f7;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f7f7f7;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff;">
          
          <!-- Logo -->
          <tr>
            <td style="padding: 40px 40px 30px;">
              <h1 style="margin: 0; color: #DF6951; font-family: serif; font-size: 24px; font-weight: 400;">Wedzway</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 15px; line-height: 1.5;">Hi {{customerName}},</p>
              
              <p style="margin: 0 0 24px; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                We received a request to reset your password. Click the button below to create a new password:
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 32px 0;">
                <tr>
                  <td>
                    <a href="{{resetLink}}" style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px;">Reset Password</a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 24px 0; color: #6b7280; font-size: 13px; line-height: 1.6;">
                This link will expire in {{expiryTime}}. If you didn't request this, please ignore this email.
              </p>
              
              <p style="margin: 32px 0 0; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                Thanks,<br/>
                Wedzway team
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; line-height: 1.5;">
                This email was sent to <a href="mailto:contact@wedzway.com" style="color: #3b82f6; text-decoration: none;">contact@wedzway.com</a>. If you'd rather not receive this kind of email, you can <a href="#" style="color: #3b82f6; text-decoration: none;">unsubscribe</a> or <a href="#" style="color: #3b82f6; text-decoration: none;">manage your email preferences</a>.
              </p>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 11px;">© 2025 Wedzway. All rights reserved.</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  },
  {
    id: "sorted-request-confirmation",
    name: "Sorted by Wedzway - Request Confirmation",
    description: "Sent when a user submits an event planning request through Sorted by Wedzway",
    category: "Sorted",
    variables: ["customerName", "customerEmail", "customerPhone", "eventType", "eventDate", "guestCount", "budget"],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Request Confirmation - Sorted by Wedzway</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f7f7f7;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f7f7f7;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff;">
          
          <!-- Logo -->
          <tr>
            <td style="padding: 40px 40px 20px;">
              <h1 style="margin: 0 0 4px; color: #1a1a1a; font-family: Impact, Arial Black, sans-serif; font-size: 32px; letter-spacing: 0.1em;">SORTED</h1>
              <p style="margin: 0; color: #6b7280; font-size: 11px; letter-spacing: 0.2em;">BY WEDZWAY</p>
            </td>
          </tr>
          
          <!-- Banner Image -->
          <tr>
            <td style="padding: 0; overflow: hidden; max-height: 350px;">
              <img src="https://images.unsplash.com/photo-1613067532651-7075a620c900?w=600&q=80" alt="Sorted by Wedzway - Event Planning" width="600" style="display: block; width: 100%; max-width: 600px; height: 350px; object-fit: cover; object-position: center; border: 0;" />
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 40px 40px;">
              <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 15px; line-height: 1.5;">Hi {{customerName}},</p>
              
              <p style="margin: 0 0 24px; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                Thank you for choosing <strong>Sorted by Wedzway</strong>! We've received your event planning request and our team is already reviewing the details.
              </p>
              
              <!-- Success Highlight Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0; background-color: #f0fdf4; border-left: 4px solid #10b981; border-radius: 6px;">
                <tr>
                  <td style="padding: 16px;">
                    <p style="margin: 0; color: #065f46; font-size: 14px; font-weight: 600;">✓ Request Received Successfully</p>
                    <p style="margin: 4px 0 0; color: #047857; font-size: 13px;">Our team will reach out to you within 2 hours during business hours (9 AM - 9 PM IST)</p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 24px 0 16px; color: #1a1a1a; font-size: 15px; line-height: 1.5; font-weight: 600;">
                Your Event Details:
              </p>
              
              <!-- Event Summary Table -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 16px 0;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="color: #6b7280; font-size: 13px; width: 45%; padding-right: 10px;">Event Type</td>
                        <td align="right" style="color: #1a1a1a; font-size: 13px; text-transform: capitalize; font-weight: 500; width: 55%;">{{eventType}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="color: #6b7280; font-size: 13px; width: 45%; padding-right: 10px;">Event Date</td>
                        <td align="right" style="color: #1a1a1a; font-size: 13px; font-weight: 500; width: 55%;">{{eventDate}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="color: #6b7280; font-size: 13px; width: 45%; padding-right: 10px;">Guest Count</td>
                        <td align="right" style="color: #1a1a1a; font-size: 13px; font-weight: 500; width: 55%;">{{guestCount}} guests</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="color: #6b7280; font-size: 13px; width: 45%; padding-right: 10px;">Budget Range</td>
                        <td align="right" style="color: #1a1a1a; font-size: 13px; font-weight: 500; width: 55%;">₹{{budget}} Lakhs</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Contact Info Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0; background-color: #fffbeb; border-radius: 6px;">
                <tr>
                  <td style="padding: 16px;">
                    <p style="margin: 0 0 8px; color: #92400e; font-size: 13px; font-weight: 600;">Confirmation Sent To:</p>
                    <p style="margin: 0 0 4px; color: #78350f; font-size: 13px;">Email: {{customerEmail}}</p>
                    <p style="margin: 0; color: #78350f; font-size: 13px;">Phone: {{customerPhone}}</p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 24px 0 0; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                Our specialized team is reviewing your requirements and will contact you shortly with:
              </p>
              
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 12px 0 24px 20px;">
                <tr>
                  <td style="padding: 4px 0;">
                    <p style="margin: 0; color: #1a1a1a; font-size: 14px; line-height: 1.8;">• Venue recommendations that match your requirements</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 4px 0;">
                    <p style="margin: 0; color: #1a1a1a; font-size: 14px; line-height: 1.8;">• Verified vendor options for your event</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 4px 0;">
                    <p style="margin: 0; color: #1a1a1a; font-size: 14px; line-height: 1.8;">• Customized event planning timeline</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 4px 0;">
                    <p style="margin: 0; color: #1a1a1a; font-size: 14px; line-height: 1.8;">• Detailed pricing and package options</p>
                  </td>
                </tr>
              </table>
              
              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 32px 0;">
                <tr>
                  <td>
                    <a href="https://wedzway.com/sorted" style="display: inline-block; padding: 12px 24px; background-color: #DF6951; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px;">Learn More About Sorted</a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 32px 0 0; color: #1a1a1a; font-size: 15px; line-height: 1.5;">
                Thanks for choosing Sorted by Wedzway,<br/>
                <strong style="color: #DF6951;">The Sorted Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 12px; color: #6b7280; font-size: 13px; line-height: 1.6;">
                <strong style="color: #1a1a1a;">Need Help?</strong><br/>
                Call us: +91 98765 43210<br/>
                Email: sorted@wedzway.com<br/>
                Location: Bangalore, India
              </p>
              <p style="margin: 12px 0 8px; color: #6b7280; font-size: 12px; line-height: 1.5;">
                This email was sent to {{customerEmail}}. For questions, contact us at <a href="mailto:sorted@wedzway.com" style="color: #DF6951; text-decoration: none;">sorted@wedzway.com</a>.
              </p>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 11px;">© 2025 Wedzway. All rights reserved.</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  },
];

export function EmailTemplatesPage({ onBack }: { onBack?: () => void }) {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = Array.from(new Set(emailTemplates.map(t => t.category)));

  const handleCopyHTML = async (template: EmailTemplate) => {
    try {
      await navigator.clipboard.writeText(template.html);
      setCopiedId(template.id);
      toast.success("HTML code copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      toast.error("Failed to copy code");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            {onBack && (
              <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/20">
                ← Back
              </Button>
            )}
            <Mail className="size-8" />
            <div>
              <h1 className="text-3xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                Email Templates
              </h1>
              <p className="text-white/90">
                Copy-paste ready HTML email templates for all Wedzway use cases
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue={categories[0]} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(category => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {emailTemplates
                  .filter(t => t.category === category)
                  .map(template => (
                    <Card
                      key={template.id}
                      className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-lg">{template.name}</h3>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {template.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.slice(0, 3).map(variable => (
                          <Badge key={variable} variant="secondary" className="text-xs">
                            {`{{${variable}}}`}
                          </Badge>
                        ))}
                        {template.variables.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{template.variables.length - 3}
                          </Badge>
                        )}
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Template Detail Modal */}
        {selectedTemplate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="text-2xl mb-2" style={{ fontFamily: "Volkhov, serif" }}>
                      {selectedTemplate.name}
                    </h2>
                    <p className="text-muted-foreground">{selectedTemplate.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedTemplate(null)}
                  >
                    ✕
                  </Button>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <Badge variant="outline">{selectedTemplate.category}</Badge>
                  <div className="flex-1" />
                  <Button
                    variant={viewMode === "preview" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("preview")}
                    className="gap-2"
                  >
                    <Eye className="size-4" />
                    Preview
                  </Button>
                  <Button
                    variant={viewMode === "code" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("code")}
                    className="gap-2"
                  >
                    <Code className="size-4" />
                    HTML Code
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleCopyHTML(selectedTemplate)}
                    className="gap-2 bg-gradient-to-r from-[#DF6951] to-[#F1A501]"
                  >
                    {copiedId === selectedTemplate.id ? (
                      <>
                        <CheckCircle2 className="size-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="size-4" />
                        Copy HTML
                      </>
                    )}
                  </Button>
                </div>

                {/* Variables */}
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-900 mb-2">
                    Available Variables:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.variables.map(variable => (
                      <code
                        key={variable}
                        className="px-2 py-1 bg-white rounded border text-xs font-mono"
                      >
                        {`{{${variable}}}`}
                      </code>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-6">
                {viewMode === "preview" ? (
                  <div className="bg-gray-100 rounded-lg p-4">
                    <iframe
                      srcDoc={selectedTemplate.html}
                      className="w-full h-[600px] bg-white rounded border"
                      title="Email Preview"
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto text-xs">
                      <code>{selectedTemplate.html}</code>
                    </pre>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
