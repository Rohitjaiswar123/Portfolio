import { LampDemo } from "./components/LampDemo";
import { SignupFormDemo } from "./components/SignupFormDemo";
import { TextGenerateEffectDemo } from "./components/TextGenerateEffectDemo";
import Navbar from './components/NavbarDemo';
import { AppleCardsCarouselDemo } from "@/app/components/AppleCardsCarouselDemo";

export default function Home() {
  return (
    <>
      <Navbar />
      <div id="lamp-demo">
        <LampDemo />
      </div>
      <div id="text-generate-demo">
        <TextGenerateEffectDemo />
      </div>
      <div id="apple-cards-carousel">
        <AppleCardsCarouselDemo />
      </div>
      <div id="signup-form">
        <SignupFormDemo />
      </div>
    </>
  );
}