import HeroSection from "@/components/HeroSection/HeroSection";
// import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

export default function Home() {
  // Loading screen commented out - client prefers simple, clean website
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [showLoading, setShowLoading] = useState(false);

  // useEffect(() => {
  //   const hasLoaded = sessionStorage.getItem("globalvin-loaded");
  //   if (hasLoaded) {
  //     setIsLoaded(true);
  //     setShowLoading(false);
  //   } else {
  //     setShowLoading(true);
  //   }
  // }, []);

  // const handleLoadingComplete = () => {
  //   sessionStorage.setItem("globalvin-loaded", "true");
  //   setIsLoaded(true);
  // };

  return (
    <div className="relative">
      {/* Loading screen removed for cleaner UX */}
      {/* {showLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />} */}
      <HeroSection />
    </div>
  );
}
