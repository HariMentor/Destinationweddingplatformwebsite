@echo off
echo.
echo Checking Project Directory Structure...
echo.

echo Current directory:
cd
echo.

echo Looking for key files/folders:
echo.

if exist "app" (
    echo * Found: app/
) else (
    echo X Missing: app/
)

if exist "components" (
    echo * Found: components/
) else (
    echo X Missing: components/
)

if exist "package.json" (
    echo * Found: package.json
) else (
    echo X Missing: package.json
)

if exist "next.config.js" (
    echo * Found: next.config.js
) else (
    echo X Missing: next.config.js
)

if exist "tsconfig.json" (
    echo * Found: tsconfig.json
) else (
    echo X Missing: tsconfig.json
)

if exist "styles" (
    echo * Found: styles/
) else (
    echo X Missing: styles/
)

echo.
echo ================================================
echo.

if exist "Destinationweddingplatformwebsite" (
    echo ! WARNING: Found 'Destinationweddingplatformwebsite' folder
    echo   This suggests you might be in the wrong directory
    echo.
    echo   Try: cd Destinationweddingplatformwebsite
    echo.
)

if exist "src" (
    echo ! WARNING: Found 'src' folder
    echo   Next.js App Router doesn't use a 'src' folder by default
    echo   Your app should be in 'app/' directory at the root
    echo.
    
    if exist "src\app" (
        echo   X Problem: You have src/app/ instead of app/
        echo   Solution: Move src/app/ to app/
        echo   Solution: Move src/components/ to components/
        echo.
    )
)

echo ================================================
echo.

echo RECOMMENDATION:
echo.

if exist "app" if exist "components" if exist "package.json" (
    echo * You're in the correct directory!
    echo   Run: npm run dev
) else (
    if exist "Destinationweddingplatformwebsite" (
        echo X You're in the wrong directory
        echo   Run: cd Destinationweddingplatformwebsite
        echo   Then: npm run dev
    ) else (
        if exist "src\app" (
            echo X Your project structure is incorrect
            echo   Files are in 'src/' but should be at root level
            echo.
            echo   This needs manual fixing - see instructions
        ) else (
            echo ? Unable to determine project structure
            echo   Please check you're in the project root
        )
    )
)

echo.
echo ================================================
echo.
pause
