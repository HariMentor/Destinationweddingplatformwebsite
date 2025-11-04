"use client";

import { blogPosts } from "./blogData";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  ArrowRight,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

interface BlogDetailPageProps {
  slug: string;
  onBack: () => void;
  onPostClick: (slug: string) => void;
}

export function BlogDetailPage({
  slug,
  onBack,
  onPostClick,
}: BlogDetailPageProps) {
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30 pt-20">
        <div className="container mx-auto px-4 md:px-8 py-12 text-center">
          <h1 className="text-3xl mb-4">Article Not Found</h1>
          <Button onClick={onBack}>Back to Blog</Button>
        </div>
      </div>
    );
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = (platform: string) => {
    const text = encodeURIComponent(post.title);
    const url = encodeURIComponent(shareUrl);

    let shareLink = "";
    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
        return;
    }

    if (shareLink) {
      window.open(shareLink, "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30">
      {/* Back Button */}
      <div className="container mx-auto px-4 md:px-8 pt-24 pb-6">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="size-4" />
          Back to Blog
        </Button>
      </div>

      {/* Hero Image */}
      <div className="container mx-auto px-4 md:px-8 mb-12">
        <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden">
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
            <Badge className="mb-4 bg-white/95 hover:bg-white" style={{ color: "#DF6951" }}>
              {post.category}
            </Badge>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl mb-6"
              style={{ fontFamily: "Volkhov, serif" }}
            >
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="size-5" />
                <span>{post.publishedAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-5" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pb-20">
        <div className="grid lg:grid-cols-[1fr,300px] gap-12">
          {/* Main Content */}
          <div>
            {/* Author Info */}
            <Card className="p-6 mb-8">
              <div className="flex items-center gap-4">
                <ImageWithFallback
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="size-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-lg">{post.author.name}</p>
                  <p className="text-muted-foreground">{post.author.role}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleShare("copy")}
                >
                  <Share2 className="size-4" />
                  Share
                </Button>
              </div>
            </Card>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div
                className="article-content"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .split("\n")
                    .map((line) => {
                      // Convert markdown-style headers
                      if (line.startsWith("# ")) {
                        return `<h1 style="font-family: Volkhov, serif; font-size: 2.5rem; margin-top: 2rem; margin-bottom: 1rem;">${line.substring(2)}</h1>`;
                      }
                      if (line.startsWith("## ")) {
                        return `<h2 style="font-family: Volkhov, serif; font-size: 2rem; margin-top: 2rem; margin-bottom: 1rem;">${line.substring(3)}</h2>`;
                      }
                      if (line.startsWith("### ")) {
                        return `<h3 style="font-family: Volkhov, serif; font-size: 1.5rem; margin-top: 1.5rem; margin-bottom: 0.75rem;">${line.substring(4)}</h3>`;
                      }
                      // Convert markdown-style bold
                      if (line.startsWith("**") && line.endsWith("**")) {
                        return `<p style="font-weight: 600; margin: 1rem 0;">${line.substring(2, line.length - 2)}</p>`;
                      }
                      // Convert numbered lists
                      if (line.match(/^\d+\./)) {
                        return `<li style="margin: 0.5rem 0;">${line.substring(line.indexOf(".") + 2)}</li>`;
                      }
                      // Convert bullet points
                      if (line.startsWith("- ")) {
                        return `<li style="margin: 0.5rem 0;">${line.substring(2)}</li>`;
                      }
                      // Regular paragraphs
                      if (line.trim()) {
                        return `<p style="line-height: 1.8; margin: 1rem 0; color: #666;">${line}</p>`;
                      }
                      return "";
                    })
                    .join(""),
                }}
              />
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t">
              <h3 className="mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-4 py-2">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="mb-4">Share this article</h3>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare("facebook")}
                >
                  <Facebook className="size-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare("twitter")}
                >
                  <Twitter className="size-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare("linkedin")}
                >
                  <Linkedin className="size-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare("copy")}
                >
                  <LinkIcon className="size-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <Card className="p-6">
                <h3 className="mb-6" style={{ fontFamily: "Volkhov, serif" }}>
                  Related Articles
                </h3>
                <div className="space-y-6">
                  {relatedPosts.map((relatedPost) => (
                    <div
                      key={relatedPost.id}
                      className="group cursor-pointer"
                      onClick={() => onPostClick(relatedPost.slug)}
                    >
                      <div className="relative h-[140px] rounded-lg overflow-hidden mb-3">
                        <ImageWithFallback
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {relatedPost.category}
                      </Badge>
                      <h4 className="group-hover:text-[#DF6951] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {relatedPost.readTime}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* CTA Card */}
            <Card
              className="p-6 text-white"
              style={{
                background: "linear-gradient(135deg, #02542D 0%, #0a7d4a 100%)",
              }}
            >
              <h3 className="mb-3 text-white" style={{ fontFamily: "Volkhov, serif" }}>
                Ready to Plan Your Dream Wedding?
              </h3>
              <p className="text-white/90 text-sm mb-6">
                Connect with verified wedding planners and venues worldwide on
                Wedzway.
              </p>
              <Button
                className="w-full gap-2"
                style={{ backgroundColor: "#DF6951" }}
                onClick={() => (window.location.href = "/")}
              >
                Get Started
                <ArrowRight className="size-4" />
              </Button>
            </Card>

            {/* Newsletter */}
            <Card className="p-6">
              <h3 className="mb-3" style={{ fontFamily: "Volkhov, serif" }}>
                Subscribe to Our Newsletter
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest wedding planning tips delivered to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02542D]"
                />
                <Button
                  className="w-full"
                  style={{ backgroundColor: "#02542D" }}
                >
                  Subscribe
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
