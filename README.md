## React Hand Controller Component:

**Component Name:** `HandController`

**Description:**

A React component that leverages a camera to detect hands using a hand detection model (MediaPipe Hands), enabling users to control actions or interactions within the application using hand gestures.

**Features:**

- **Real-time Hand Detection:** Utilizes a high-performance hand detection model to track and analyze hand positions and gestures in real-time.
- **Gesture Recognition:** Interprets detected hand gestures, translating them into specific actions or commands.
- **Customizable Gesture Set:** Allows for the definition of a custom set of recognized gestures, enabling developers to tailor the component to their specific needs.
- **Interactive Feedback:** Provides visual feedback to the user regarding detected gestures and recognized actions.
- **Flexible Integration:** Designed to be easily integrated into various React applications and components.

**Example Usage:**

```javascript
import HandController from "react-hand-controller";

function MyComponent() {
  return (
    <div>
      <HandController passThroughPinchAsClick={true} />
    </div>
  );
}
```
