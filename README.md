## React Hand Controller Component:

**Component Name:** `HandController`

**Description:**

A React component that leverages a camera to detect hands using a hand detection model (MediaPipe Hands), enabling users to control actions or interactions within the application using hand gestures.

**Demo**

[Handly Alchemy](https://alchemy.pbartz.net) - game to discover new elements by combining others.

**Features:**

- **Real-time Hand Detection:** Utilizes a high-performance hand detection model to track and analyze hand positions and gestures in real-time.
- **Gesture Recognition:** Interprets detected hand gestures, translating them into specific actions or commands.
- **Interactive Feedback:** Provides visual feedback to the user regarding detected gestures and recognized actions.
- **Flexible Integration:** Designed to be easily integrated into various React applications and components.

**Example Usage:**

```javascript
import HandController from "react-hand-controller";

function MyComponent() {
  return (
    <div>
      <HandController
        passThroughPinchAsClick={true}
        showMiniCamera={true}
        showFeedback={true}
        handGizmoConfig={{
          showCenter: true,
          showPose: false,
        }}
        onModelLoaded={() => {
          this.setState({ loaded: true });
        }}
        onHandUpdate={this.onHandsUpdate.bind(this)}
        onPinch={this.onPinch.bind(this)}
        onPoseChange={this.inPoseChange.bind(this)}
        onDragStart={this.onDragStart.bind(this)}
        onDrag={this.onDrag.bind(this)}
        onDrop={this.onDrop.bind(this)}
      />
    </div>
  );
}
```
