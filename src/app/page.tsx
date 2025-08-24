import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">CV RGA</h1>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h2>
            <p className="text-xl text-muted-foreground">
              Full Stack Developer passionate about creating exceptional digital experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Web Development</CardTitle>
                <CardDescription>
                  Creating modern and responsive web applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                                  <p className="text-muted-foreground mb-4">
                    Specialized in React, Next.js, TypeScript and Node.js
                  </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/projects">View Projects</a>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>UI/UX Design</CardTitle>
                <CardDescription>
                  Intuitive interfaces and exceptional user experiences
                </CardDescription>
              </CardHeader>
              <CardContent>
                                  <p className="text-muted-foreground mb-4">
                    Using Tailwind CSS, shadcn/ui and modern design principles
                  </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/cv">View CV</a>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Technical Blog</CardTitle>
                <CardDescription>
                  Sharing knowledge and development experiences
                </CardDescription>
              </CardHeader>
              <CardContent>
                                  <p className="text-muted-foreground mb-4">
                    Articles about the latest technologies and best practices
                  </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/about">About Me</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
