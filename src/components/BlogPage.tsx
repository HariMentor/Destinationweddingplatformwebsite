"use client";

import { useState } from "react";
import { blogPosts, blogCategories } from "./blogData";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Clock, Calendar, User, Search, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BlogPageProps {
  onPostClick: (slug: string) => void;
}

export function BlogPage({ onPostClick }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on category and search
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All Posts" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  // Featured post (first post)
  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30">
      {/* Hero Section */}
      <div
        className="relative py-20 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #02542D 0%, #0a7d4a 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1
              className="text-5xl md:text-6xl mb-6 text-white"
              style={{ fontFamily: "Volkhov, serif" }}
            >
              Wedding Planning Blog
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Expert advice, inspiration, and guides for planning your perfect
              destination wedding
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 rounded-full bg-white border-none shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Featured Post */}
        {!searchQuery && selectedCategory === "All Posts" && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <div
                className="h-1 w-12 rounded"
                style={{ backgroundColor: "#DF6951" }}
              />
              <span
                className="uppercase tracking-wide"
                style={{ color: "#DF6951" }}
              >
                Featured Article
              </span>
            </div>

            <Card
              className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => onPostClick(featuredPost.slug)}
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-[300px] md:h-[500px] overflow-hidden">
                  <ImageWithFallback
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <Badge
                    className="absolute top-4 left-4 bg-white/95 hover:bg-white"
                    style={{ color: "#DF6951" }}
                  >
                    {featuredPost.category}
                  </Badge>
                </div>

                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4" />
                      <span>{featuredPost.publishedAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="size-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>

                  <h2
                    className="text-3xl md:text-4xl mb-4"
                    style={{ fontFamily: "Volkhov, serif" }}
                  >
                    {featuredPost.title}
                  </h2>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-4 mb-6">
                    <ImageWithFallback
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="size-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{featuredPost.author.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {featuredPost.author.role}
                      </p>
                    </div>
                  </div>

                  <Button
                    className="w-fit gap-2"
                    style={{ backgroundColor: "#DF6951" }}
                  >
                    Read Article
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {blogCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
                style={
                  selectedCategory === category
                    ? { backgroundColor: "#02542D" }
                    : {}
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group flex flex-col"
              onClick={() => onPostClick(post.slug)}
            >
              <div className="relative h-[240px] overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <Badge
                  className="absolute top-4 left-4 bg-white/95 hover:bg-white"
                  style={{ color: "#DF6951" }}
                >
                  {post.category}
                </Badge>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="size-3.5" />
                    <span>{post.publishedAt}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl mb-3" style={{ fontFamily: "Volkhov, serif" }}>
                  {post.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t">
                  <ImageWithFallback
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="size-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-sm">{post.author.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {post.author.role}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <div
              className="size-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: "rgba(223, 105, 81, 0.1)" }}
            >
              <Search className="size-10" style={{ color: "#DF6951" }} />
            </div>
            <h3 className="text-2xl mb-3" style={{ fontFamily: "Volkhov, serif" }}>
              No Articles Found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Posts");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Newsletter Section */}
        <div
          className="mt-20 rounded-2xl p-8 md:p-12 text-center"
          style={{
            background: "linear-gradient(135deg, #02542D 0%, #0a7d4a 100%)",
          }}
        >
          <h2
            className="text-3xl md:text-4xl text-white mb-4"
            style={{ fontFamily: "Volkhov, serif" }}
          >
            Stay Updated
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest wedding planning tips,
            destination guides, and exclusive offers.
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white border-none"
            />
            <Button
              className="whitespace-nowrap"
              style={{ backgroundColor: "#DF6951" }}
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
