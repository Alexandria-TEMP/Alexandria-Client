import { Card, CardBody } from "@nextui-org/react";
import VersionRender from "../version-render/component";
import { idType } from "@/lib/types/api-types";

// TODO jsdoc
export default function VersionContentCard({
  header,
  footer,
  versionId,
}: Readonly<{
  header: React.ReactNode;
  footer?: React.ReactNode;
  versionId: idType;
}>) {
  return (
    <Card>
      {header}
      <CardBody>
        <VersionRender id={versionId.toString()} />
      </CardBody>
      {footer}
    </Card>
  );
}
