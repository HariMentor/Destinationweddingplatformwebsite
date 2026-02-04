import os

file_path = r"c:\Users\hariv\OneDrive\Desktop\Mentodots\Destinationweddingplatformwebsite\src\components\VenueDetailsPageV2.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

# Indices (0-based)
mobile_start_idx = 1101 - 1
mobile_end_idx = 1949 - 1

desktop_start_idx = 2555 - 1
desktop_end_idx = 3654 - 1

# Parts
# 1. Keep start until mobile form
part1 = lines[:mobile_start_idx]

# 2. New mobile form
mobile_replacement = [
    '            <div className="lg:hidden">\n',
    '              <VenueEnquiryForm packages={venue.packages} formatPrice={formatPrice} />\n',
    '            </div>\n'
]

# 3. Keep between mobile and desktop forms
# Resume from line after mobile_end_idx
part2 = lines[mobile_end_idx+1 : desktop_start_idx]

# 4. New desktop form
# We are replacing the Card inside the wrapper div, so index 2555 is <Card...>
desktop_replacement = [
    '            <VenueEnquiryForm packages={venue.packages} formatPrice={formatPrice} />\n'
]

# 5. Keep rest
# Resume from line after desktop_end_idx
part3 = lines[desktop_end_idx+1:]

# Combine
new_lines = part1 + mobile_replacement + part2 + desktop_replacement + part3

with open(file_path, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Successfully replaced both enquiry forms.")
