import { BrainCircuit, BookOpen, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-gray-800 dark:text-white tracking-tight">
            About AI Study Pal
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Your intelligent partner in the journey of learning and discovery.
          </p>
        </div>

        <div className="space-y-10 text-left">
          <div className="p-8 bg-card rounded-2xl shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <BrainCircuit className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-card-foreground">Our Mission</h2>
            </div>
            <p className="text-muted-foreground">
              At AI Study Pal, our mission is to make learning more accessible, efficient, and personalized for everyone. We believe that by harnessing the power of artificial intelligence, we can create tools that adapt to individual learning styles, identify knowledge gaps, and provide the resources needed to succeed. We're here to help you not just study, but to truly understand and master any subject you choose.
            </p>
          </div>

          <div className="p-8 bg-card rounded-2xl shadow-lg">
             <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-card-foreground">What We Do</h2>
            </div>
            <p className="text-muted-foreground">
              AI Study Pal offers a suite of powerful tools designed to enhance your study sessions. From generating customized study plans and creating challenging quizzes to summarizing complex texts and suggesting relevant learning resources, our platform is built to support you at every step. We analyze your inputs to provide tailored keywords, study tips, and motivational feedback, ensuring you stay on track and inspired.
            </p>
          </div>

          <div className="p-8 bg-card rounded-2xl shadow-lg">
             <div className="flex items-center gap-4 mb-4">
               <div className="p-3 bg-primary/10 rounded-full">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-card-foreground">Our Vision</h2>
            </div>
            <p className="text-muted-foreground">
              We envision a future where education is not one-size-fits-all. A future where every student has a personal AI assistant to guide them, challenge them, and help them achieve their full potential. We are continuously innovating and improving our AI models to bring this vision to life, creating a smarter, more connected, and more empowering learning experience for students around the world.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
