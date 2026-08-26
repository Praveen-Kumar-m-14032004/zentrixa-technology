When implementing media features (camera, microphone)
- Always wrap `getUserMedia` calls in a try-catch block.
- Specifically catch `NotAllowedError`, `PermissionDeniedError`, and `NotFoundError`.
- Provide user-friendly UI feedback (toasts, inline errors) instead of using `alert()`.
- Explain to the user how to fix the permission issue (e.g., "Check browser settings").