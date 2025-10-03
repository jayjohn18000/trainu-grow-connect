import DirectoryPreview from "@/views/DirectoryPreview";
import TrainerProfilePreview from "@/views/TrainerProfilePreview";

export default function App() {
  const mode = new URLSearchParams(window.location.search).get("view") || "dir";
  return mode === "profile" ? <TrainerProfilePreview /> : <DirectoryPreview />;
}
