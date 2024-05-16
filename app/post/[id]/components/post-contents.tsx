import HeaderSubtle from "@/components/header-subtle";
import getPostData from "../lib/post-api";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import PostLinks from "./post-links";
import ContributeDropdown from "./contribute-dropdown";

/**
 * Main body of a Post. Includes: title, main metadata, and action buttons.
 *
 * @param postId Post ID
 */
export default async function PostContents({ postId }: { postId: string }) {
  const placeholderContents: string =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin congue quis ipsum et vestibulum. Quisque lorem turpis, facilisis quis turpis et, tempor iaculis purus. Mauris mollis nulla non turpis suscipit viverra. Morbi nec cursus sapien, non elementum mi. Ut sed cursus leo, ac lacinia ligula. Nunc ullamcorper, leo nec lobortis tempor, eros nulla euismod ligula, et varius metus ex eu nibh. Fusce eget scelerisque eros, a eleifend diam. Mauris porta feugiat ligula, ut efficitur nisi iaculis sit amet. Integer congue diam ac blandit pellentesque. Mauris posuere, enim sed viverra ultrices, urna lacus egestas odio, quis laoreet lorem nunc et ipsum. In augue massa, vestibulum vitae nulla sit amet, tempor dignissim lectus." +
    "Cras rutrum lectus non pulvinar egestas. Ut congue fringilla suscipit. In porttitor sed nisi et sodales. Proin consectetur interdum tortor dapibus vestibulum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec bibendum iaculis velit. Mauris vulputate, est vitae luctus malesuada, leo odio suscipit ligula, ac lacinia tellus velit ut turpis. Praesent consequat nulla quis ultricies pretium. Phasellus vitae quam felis. Sed aliquet lacus ac libero ullamcorper efficitur. Suspendisse potenti." +
    "Suspendisse ornare mauris quis quam volutpat, in vulputate sem varius. Nam vel urna quis tortor pretium venenatis. Quisque luctus nunc ut ante ultricies ultrices. Nulla ac lectus sed lacus lacinia hendrerit at nec orci. Suspendisse dictum hendrerit est, vitae consequat quam venenatis quis. Integer id dui non mi commodo lacinia sit amet eu erat. Phasellus consequat sapien at suscipit viverra. Donec vel pharetra enim, vel lacinia lacus." +
    "Proin congue hendrerit diam, eget pretium elit mollis id. Fusce blandit magna aliquet nibh euismod facilisis. Duis sed ipsum luctus, sodales ipsum eu, gravida purus. Cras vehicula libero leo, nec euismod eros condimentum nec. Nam gravida massa tellus, id dignissim risus pharetra quis. Phasellus vitae nisi vestibulum, mattis diam ut, volutpat ligula. Nulla non nulla a odio consequat suscipit at nec sem. Duis cursus elit ornare nisl molestie interdum. Etiam pharetra libero vel elit pretium, fermentum sagittis nisl ullamcorper. Phasellus quis eros erat. Donec congue neque hendrerit ante elementum, nec interdum purus tempor. Ut imperdiet cursus ante, at porttitor ante semper at. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent erat urna, condimentum ac tincidunt non, elementum vitae nunc. Mauris orci ligula, pretium sed auctor vel, pulvinar ut neque. Mauris in molestie nisl." +
    "Integer suscipit augue dictum risus ornare bibendum. Nullam vitae ex eget lacus mollis pharetra pellentesque eu arcu. Sed a erat facilisis, vestibulum orci egestas, accumsan eros. Sed libero neque, porttitor sit amet tellus non, ultrices dignissim dolor. Ut sollicitudin, augue nec auctor ultricies, purus est condimentum urna, a consequat est enim convallis ex. Donec purus elit, consectetur eu erat vitae, scelerisque eleifend libero. Duis iaculis, augue et bibendum sollicitudin, arcu elit luctus elit, vitae lobortis dolor diam quis nulla. Nunc ut faucibus sem. Praesent quis nisl ornare, pulvinar nisl a, pharetra orci. Pellentesque id lacus sed augue ultricies interdum sit amet id nisi. Suspendisse pretium, libero a gravida maximus, augue est fringilla nisl, ut luctus tortor lacus a nibh. Etiam maximus, eros et molestie sodales, purus nulla finibus velit, pulvinar bibendum ligula ligula ac ante. Vestibulum leo sapien, dignissim sed est vitae, tincidunt aliquam eros. Donec non mi posuere justo pharetra facilisis et ut risus.";

  const data = await getPostData(postId);

  return (
    <Card>
      {/* Title */}
      <CardHeader>
        <h1 className="font-semibold">{data.title}</h1>
      </CardHeader>

      {/* (part of) Metadata */}
      <CardHeader className="-mt-4 flex gap-12">
        <div className="flex-col">
          <HeaderSubtle>Created on {data.createdAt}</HeaderSubtle>
          <HeaderSubtle>Last update on {data.updatedAt}</HeaderSubtle>
        </div>
        <div className="flex-col">
          <HeaderSubtle>Post type</HeaderSubtle>
          <Chip>{data.postType}</Chip>
        </div>
        <div className="flex-col">
          <HeaderSubtle>Status</HeaderSubtle>
          <Chip>{data.status}</Chip>
        </div>
        <div className="grow" />
        <PostLinks postId={postId} currentView="contents" />
        <ContributeDropdown />
      </CardHeader>

      {/* Contents */}
      <CardBody>
        <p>{placeholderContents}</p>
      </CardBody>
    </Card>
  );
}
