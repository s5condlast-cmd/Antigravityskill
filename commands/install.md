# /install (1-Time Setup)

Follow the external UI/UX design toolchain 1-time installation workflow:

1. **Check Existing Setup**: If `agentation` and design skills are already configured in the workspace, skip and inform the user.
2. **Execute 1-Time Installation**:
   - `npx -y impeccable install`
   - `npx -y skills add Leonxlnx/taste-skill`
   - `npm install agentation`
3. **Mount Components & Design Tokens**:
   - Mount `<Agentation />` in `app/layout.tsx` or `src/App.tsx` (wrapped in `NODE_ENV === 'development'`).
   - Use `references/UI_TOOLCHAIN.md` component recipes (`<Button variant="glass" />`, `<Card />`).
4. **Confirm Toolchain Readiness**: Confirm setup completion and enable taste-driven frontend component workflows.
