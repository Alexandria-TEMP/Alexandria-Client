/**
 * Displays a message explaining the render has failed.
 */
export default function RenderFailed() {
  return (
    <div
      className="h-80 flex flex-col justify-center items-center bg-danger-100 rounded-lg"
      data-testid="render-pending"
    >
      <h1>Render has failed!</h1>
      <h3>
        This publication&apos;s Quarto project failed to render. Please try to
        render in your computer before submitting. Contact the Alexandria team
        if your render works on your computer.
      </h3>
    </div>
  );
}
