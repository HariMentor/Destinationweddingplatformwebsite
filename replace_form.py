import os

file_path = r"c:\Users\hariv\OneDrive\Desktop\Mentodots\Destinationweddingplatformwebsite\src\components\VenueDetailsPageV2.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

# 1-based indices to 0-based
start_delete = 2555 - 1
end_delete = 3654 - 1

# Keep lines before start_delete
new_lines = lines[:start_delete]

# Insert new component
# Indentation seems to be 12 spaces based on context
indent = "            "
new_lines.append(f"{indent}<VenueEnquiryForm packages={{venue.packages}} formatPrice={{formatPrice}} />\n")

# Resume lines after end_delete (inclusive of end_delete in deletion?)
# We want to delete up to and including line 3654.
# So we start keeping from 3654 + 1? i.e. index 3654
next_line_index = end_delete + 1
new_lines.extend(lines[next_line_index:])

with open(file_path, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Successfully replaced content.")
