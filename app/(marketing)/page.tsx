
import HeroLanding from "@/components/sections/hero-landing";
import PreviewLanding from "@/components/sections/preview-landing";
import Title from "@/components/layout/title-section"
import Home from "@/components/marketing/home/homepage";
export default function IndexPage() {
  return (
    <>
<Home />


      {/* Example with both title and description */}
      {/* <Title
        title="About Us"
        description="The ICPC fights corruption in Nigeria by investigating and prosecuting offenders, improving public sector systems, and educating the public. Established under the ICPC Act 2000, it also seeks public support in combating corruption, with cases prosecuted under the consent of the Attorney-General and heard by designated judges."
      /> */}

      {/* Example with only title */}
      {/* <Title title="Our Mission" /> */}
   
      {/* <HeroLanding />
      <PreviewLanding /> */}
    </>
  );
}
