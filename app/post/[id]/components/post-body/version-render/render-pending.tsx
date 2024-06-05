import { Button } from "@nextui-org/react";

export default function RenderPending({ refresh }: { refresh: () => void }) {
  return (
    <div
      className="py-20 flex flex-col justify-center items-center bg-default-200 rounded-lg"
      data-testid="render-pending"
    >
      <h1>Rendering...</h1>
      <h3>
        This publication&apos;s Quarto project is currently being rendered.
        Please check back later.
      </h3>
      <Button onClick={refresh} color="primary" className="mt-8">
        <h3 className="px-4">Refresh</h3>
      </Button>
    </div>
  );
}
