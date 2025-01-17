import Logo from "@/components/theme/logo";
import { Link, User } from "@nextui-org/react";

/**
 * About page
 */
export default function About() {
  return (
    <div className="px-32 flex flex-col items-center">
      <Logo width={400} />
      {/* Main page body wrapper */}
      <div className="flex flex-col gap-12 pl-8">
        {/* Section about Alexandria itself */}
        <div className="text-center">
          <h1>Welcome to Alexandria!</h1>
          <p className="mt-2 text-justify">
            <span className="font-bold">Alexandria</span> is a collaborative{" "}
            <Link href="https://github.com/Alexandria-TEMP">open-source</Link>{" "}
            platform dedicated to publishing, discussing and developing
            scientific research. It is designed to be community-oriented and
            intersectional, merging the functionality of version control with an
            intuitive interface. Any user can post their reflections, ask
            questions or publish research. Any work published on the platform
            becomes property of the community - anyone can make additions to it.
            Community members with the relevant expertise are able to peer
            review the proposed additions, approving or rejecting the changes.
            In this way, the community controls how a post evolves.
          </p>
          <p className="mt-2 text-justify">
            Posts are repositories of Quarto files, rendered by the platform
            into a human-readable format. This allows users to share the code
            behind their work, merging the gap between the process and the final
            result of research. Quarto is easier to use than LaTex, as it is a
            form of Markdown, and allows for the incorporation of complex
            figures using the four most common scientific programming languages:
            Python, R, Julia, and Observable.{" "}
            <Link href="https://quarto.org/">Learn more about Quarto.</Link>
          </p>
        </div>
        {/* Section about timeline/contributors */}
        <div className="flex flex-col gap-32">
          <h1 className="text-center -mb-16">Contributors</h1>

          {/* Development: First version */}
          <div className="flex flex-row gap-3">
            <div className="w-1/2 text-justify">
              <h2>Development: First version (2024)</h2>
              <p className="mt-2">
                During 10 weeks from April to June of 2024 a team of five
                students built the initial version of Alexandria. This version
                is the base for the website you are currently browsing, and was
                built under the guidance of Andrew Demetriou as part of the
                CSE2000 Software Project course for the bachelor of Computer
                Science and Engineering at TU Delft. You can read more about
                this stage of the development in{" "}
                <Link isDisabled>their report.</Link>
              </p>
            </div>
            <div className="flex flex-row flex-wrap justify-evenly w-1/2 gap-y-3">
              <User
                name="Jannes Kelso"
                description="Back end developer"
                avatarProps={{ size: "lg" }}
              />
              <User
                name="Francisco Cunha"
                description="Front end developer"
                avatarProps={{ size: "lg" }}
              />
              <User
                name="Maxime Caux"
                description="Back end developer"
                avatarProps={{ size: "lg" }}
              />
              <User
                name="Miruna Negoitescu"
                description="Front end developer"
                avatarProps={{ size: "lg" }}
              />
              <User
                name="Eve Smura"
                description="Back end developer"
                avatarProps={{ size: "lg" }}
              />
            </div>
          </div>

          {/* UX Design */}
          <div className="flex flex-row gap-3">
            <div className="flex flex-row flex-wrap justify-evenly w-1/2 gap-y-3">
              <User
                name="Zhuoting Wang"
                description="UX designer"
                avatarProps={{ size: "lg" }}
              />
            </div>
            <div className="w-1/2 text-justify">
              <h2>User experience design (2023)</h2>
              <p className="mt-2">
                With the initial funding gathered from the developed prototype,
                Andrew Demetriou hired a UX desiner, Zhuoting Wang, to help
                understand how to make Alexandria a platform that fullfils the
                needs of scientists. After conducting user research, she
                designed user flows for the platform and the interface for
                several of Alexandria&apos;s pages.
              </p>
            </div>
          </div>

          {/* Development: Prototype */}
          <div className="flex flex-row gap-3">
            <div className="w-1/2 text-justify">
              <h2>Development: Prototype (2022)</h2>
              <p className="mt-2">
                During 10 weeks from April to June of 2022 as part of the
                CSE2000 Software Project course for the bachelor of Computer
                Science and Engineering at TU Delft a team of five students
                built a prototype for Alexandria. This prototype explored the
                capabilities of the platform which did not exist at this point.
                It was used to showcase its potential and gather funding for
                further development. The prototype&apos;s source can be found in
                its{" "}
                <Link href="https://github.com/prjct-alexandria/Alexandria">
                  GitHub repository.
                </Link>
              </p>
            </div>
            <div className="flex flex-row flex-wrap justify-evenly w-1/2 gap-y-3">
              <User
                name="Amy van der Meijden"
                description="Developer"
                avatarProps={{ size: "lg" }}
              />
              <User
                name="Andreea Zlei"
                description="Developer"
                avatarProps={{ size: "lg" }}
              />
              <User
                name="Emiel Witting"
                description="Developer"
                avatarProps={{ size: "lg" }}
              />
              <User
                name="Jos Sloof"
                description="Developer"
                avatarProps={{ size: "lg" }}
              />
              <User
                name="Mattheo de Wit"
                description="Developer"
                avatarProps={{ size: "lg" }}
              />
            </div>
          </div>

          {/* Ideation */}
          <div className="flex flex-row gap-3">
            <div className="flex flex-row flex-wrap justify-evenly w-1/2 gap-y-3">
              <User name="Andrew Demetriou" avatarProps={{ size: "lg" }} />
              <User name="Cynthia Liem" avatarProps={{ size: "lg" }} />
            </div>
            <div className="w-1/2 text-justify">
              <h2>Ideation</h2>
              <p className="mt-2">
                Placeholder text: Waiting for Andrew to write.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
