import Title from "@/components/layout/title-section"
import About from "@/components/marketing/about/about"
export default function Home() {
    return (
     
        <>

        <Title
            title="About Us"
            description="The SPFACC fights corruption in Nigeria by investigating and prosecuting offenders, improving public sector systems, and educating the public. Established under the SPFACC Act 2000, it also seeks public support in combating corruption, with cases prosecuted under the consent of the Attorney-General and heard by designated judges."
        />

        <About />

      {/* Example with only title */ }
    {/* <Title title="Our Mission" /> */}
      </>
  
  )
}

