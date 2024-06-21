import Logo from "@/components/theme/logo";
import { User } from "@nextui-org/react";
/**
 * Placeholder 'About' page.
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
            <span className="font-bold">Alexandria</span> is an open-source
            platform for scientific collaboration. Its aim is to make science
            available for everyone and to promote spontaneous, international
            collaboration. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur.
          </p>
        </div>
        {/* Section about timeline/contributors */}
        <div className="flex flex-col gap-8">
          <h1 className="text-center">Contributors</h1>

          {/* Development: First version */}
          <div className="flex flex-row gap-3">
            <div className="w-3/5 text-justify">
              <h2>Development: First version (2024)</h2>
              <p className="mt-2">
                Placeholder text, in here we should explain what we developed as
                part of our own SP leg. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
            <div className="flex flex-row flex-wrap justify-evenly w-2/5">
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
            <div className="flex flex-row flex-wrap justify-evenly w-2/5">
              <User
                name="Zhuoting Wang"
                description="UX designer"
                avatarProps={{ size: "lg" }}
              />
            </div>
            <div className="w-3/5 text-justify">
              <h2>User experience design (202?)</h2>
              <p className="mt-2">
                Placeholder text, in here we should explain what Zhuoting did,
                and why/how Andrew hired her. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </div>

          {/* Development: Prototype */}
          <div className="flex flex-row gap-3">
            <div className="w-3/5 text-justify">
              <h2>Development: Prototype (202?)</h2>
              <p className="mt-2">
                Placeholder text, in here we should explain what was developed
                as part of the first teams SP. Mention that they did not much
                guidance, and figured out how a lot of this stuff could look
                like. Their version was used to get funding for further
                development. Include link to their GitHub.
              </p>
            </div>
            <div className="flex flex-row flex-wrap justify-evenly w-2/5">
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
            <div className="flex flex-row flex-wrap justify-evenly w-2/5">
              <User name="Andrew Demetriou" avatarProps={{ size: "lg" }} />
              <User name="Cynthia Liem" avatarProps={{ size: "lg" }} />
            </div>
            <div className="w-3/5 text-justify">
              <h2>Ideation</h2>
              <p className="mt-2">
                Placeholder text, maybe we should let Andrew write this one.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
