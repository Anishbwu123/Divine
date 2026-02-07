
        NEW FOLDER STRUCTURE FOR NEW ARCHITECTURE

            FEATURE BASED ARCHITECTURE  

root/
├── android/               # Native Android project
├── ios/                   # Native iOS project
├── src/
│   ├── assets/            # Fonts, Images, SVG
│   ├── components/        # Shared UI (Buttons, Inputs, Cards)
│   │   ├── common/        # Atoms (Generic components)
│   │   └── layout/        # Shared layouts (Wrapper, SafeView)
│   ├── features/          # Feature-based modules (THE CORE)
│   │   ├── auth/          # Everything related to Login/Signup
│   │   │   ├── components/
│   │   │   ├── screens/
│   │   │   ├── hooks/
│   │   │   └── authService.ts
│   │   └── home/          # Home feature
│   ├── navigation/        # Stack, Tab, Drawer Navigators
│   ├── services/          # Global API logic (Axios/Fetch configs)
│   ├── store/             # State Management (Zustand, Redux, or Context)
│   ├── theme/             # Colors, Spacing, Typography
│   ├── utils/             # Helper functions (Date formatters, etc.)
│   └── specs/             # <--- NEW ARCHITECTURE SPECIFIC
│       └── NativeMyModule.ts # TurboModule definitions for Codegen
├── App.tsx                # App entry point
├── package.json           # Includes 'codegenConfig'
└── tsconfig.json          # Path aliases (e.g., @components)

