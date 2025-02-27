
import { Share2, Copy, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";

interface SocialShareProps {
  city: string;
  todayTimes: {
    imsak: string;
    aksam: string;
  } | null;
}

const SocialShare = ({ city, todayTimes }: SocialShareProps) => {
  const shareLink = window.location.href;
  const shareText = todayTimes 
    ? `Bugün ${city} için iftar vakti: ${todayTimes.aksam}, imsak vakti: ${todayTimes.imsak}`
    : `${city} için namaz vakitleri`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `${shareText} - ${shareLink}`
    );
    toast({
      title: "Kopyalandı!",
      description: "Bilgiler panoya kopyalandı.",
    });
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareLink)}`,
      "_blank"
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareLink
      )}&quote=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/80 dark:bg-[#2e463b]/80 border-green-200 dark:border-green-900"
          aria-label="Paylaş"
        >
          <Share2 className="h-5 w-5 text-[#33691e] dark:text-[#aed581]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2 bg-white dark:bg-[#1e3a2a] border-green-200 dark:border-green-900">
        <div className="grid gap-1">
          <Button
            variant="outline"
            size="sm"
            className="flex justify-start text-[#33691e] dark:text-[#aed581] border-green-100 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900"
            onClick={copyToClipboard}
          >
            <Copy className="h-4 w-4 mr-2" />
            Kopyala
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex justify-start text-blue-500 border-blue-100 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
            onClick={shareOnTwitter}
          >
            <Twitter className="h-4 w-4 mr-2" />
            Twitter
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex justify-start text-blue-600 border-blue-100 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
            onClick={shareOnFacebook}
          >
            <Facebook className="h-4 w-4 mr-2" />
            Facebook
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SocialShare;
