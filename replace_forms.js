const fs = require('fs');
const path = require('path');

const filePath = String.raw`c:\Users\hariv\OneDrive\Desktop\Mentodots\Destinationweddingplatformwebsite\src\components\VenueDetailsPageV2.tsx`;

try {
    const content = fs.readFileSync(filePath, 'utf-8');
    // split by any newline format to handle CRLF/LF
    const lines = content.split(/\r?\n/);

    // Indices (0-based)
    const mobileStartIdx = 1101 - 1;
    const mobileEndIdx = 1949 - 1;

    const desktopStartIdx = 2555 - 1;
    const desktopEndIdx = 3654 - 1;

    // Verify length
    console.log(`Total lines: ${lines.length}`);

    // 1. Keep start until mobile form
    const part1 = lines.slice(0, mobileStartIdx);

    // 2. New mobile form
    const mobileReplacement = [
        '            <div className="lg:hidden">',
        '              <VenueEnquiryForm packages={venue.packages} formatPrice={formatPrice} />',
        '            </div>'
    ];

    // 3. Keep between mobile and desktop forms
    // Resume from line after mobileEndIdx
    const part2 = lines.slice(mobileEndIdx + 1, desktopStartIdx);

    // 4. New desktop form
    const desktopReplacement = [
        '            <VenueEnquiryForm packages={venue.packages} formatPrice={formatPrice} />'
    ];

    // 5. Keep rest
    const part3 = lines.slice(desktopEndIdx + 1);

    const newLines = [
        ...part1,
        ...mobileReplacement,
        ...part2,
        ...desktopReplacement,
        ...part3
    ];

    fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');
    console.log("Successfully replaced both enquiry forms.");

} catch (error) {
    console.error("Error:", error);
    process.exit(1);
}
