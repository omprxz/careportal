import Image from "next/image"
import Link from "next/link"
import { LuChevronRight, LuHeart, LuShield, LuUsers } from "react-icons/lu"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 
          className="text-4xl md:text-5xl font-bold text-primary mb-4"
        >
          About Care Portal
        </h1>
        <p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Empowering Patients, Enabling Care. Bridging the gap between patients and doctors through AI-driven insights and direct consultations.
        </p>
      </section>

      {/* Mission Statement */}
      <section className="my-16 text-center">
        <h2 className="text-3xl font-semibold text-primary mb-6">Our Mission</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        Our mission is to achieve excellence in patient care by providing the highest quality medical services, prioritizing patient comfort, dignity, and well-being. We are committed to innovation in healthcare solutions, utilizing cutting-edge technologies and medical advancements to deliver state-of-the-art care. We foster a culture of continuous improvement and learning to enhance our services and meet the evolving needs of those we serve.
        </p>
      </section>

      {/* Core Features */}
      <section className="my-16">
        <h2 className="text-3xl font-semibold text-primary text-center mb-8">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<LuHeart className="h-8 w-8 text-primary" />}
            title="AI-Powered Symptom Checker"
            description="Our AI-driven tool analyzes symptoms and provides insights to guide you toward effective care."
          />
          <FeatureCard
            icon={<LuUsers className="h-8 w-8 text-primary" />}
            title="Direct Doctor Access"
            description="Connect directly with doctors for consultations, ensuring immediate attention and trusted advice."
          />
          <FeatureCard
            icon={<LuShield className="h-8 w-8 text-primary" />}
            title="Personalized Care"
            description="Receive customized health insights and guidance based on your unique health profile."
          />
        </div>
      </section>

      {/* Our Values */}
      <section className="my-16 text-center bg-muted p-8 rounded-lg">
        <h2 className="text-3xl font-semibold text-primary mb-8">Our Values</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Integrity, transparency, and compassion are the cornerstones of our approach. We are committed to improving lives through ethical and inclusive practices.
        </p>
      </section>

      {/* Meet the Team */}
      <section className="my-16 text-center">
        <h2 className="text-3xl font-semibold text-primary mb-8">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TeamMemberCard
            imageSrc="https://avatar.iran.liara.run/public/11"
            name="Omprakash Kumar"
            role="Full Stack Developer"
          />
          <TeamMemberCard
            imageSrc="https://avatar.iran.liara.run/public/21"
            name="Akash Raj"
            role="Frontend Developer"
          />
          <TeamMemberCard
            imageSrc="https://avatar.iran.liara.run/public/55"
            name="Anjali Kumari"
            role="-"
          />
          <TeamMemberCard
            imageSrc="https://avatar.iran.liara.run/public/67"
            name="Sristy Srivastava"
            role="-"
          />
          <TeamMemberCard
            imageSrc="https://avatar.iran.liara.run/public/18"
            name="Shivam Kumar"
            role="-"
          />
          <TeamMemberCard
            imageSrc="https://avatar.iran.liara.run/public/98"
            name="Sonam Singh"
            role="-"
          />
          <TeamMemberCard
            imageSrc="https://avatar.iran.liara.run/public/57"
            name="Rupa Kumari"
            role="-"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="my-16 text-center">
        <h2 className="text-2xl font-semibold text-primary mb-4">Ready to start your journey to better health?</h2>
        <Button asChild size="lg" className="mt-4">
          <Link href="/login">
            Get Started
            <LuChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function TeamMemberCard({ imageSrc, name, role }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6 text-center">
        <Image
          src={imageSrc}
          alt={name}
          width={100}
          height={100}
          className="rounded-full mx-auto mb-4"
        />
        <h3 className="text-lg font-semibold text-primary">{name}</h3>
        <p className="text-sm text-muted-foreground mt-2">{role}</p>
      </CardContent>
    </Card>
  )
}

function TimelineItem({ year, event }) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 w-24 text-right">
        <span className="font-bold text-primary">{year}</span>
      </div>
      <div className="flex-grow pl-8 relative">
        <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary"></div>
        <div className="border-l-2 border-primary pl-6 pb-6">
          <p className="text-muted-foreground">{event}</p>
        </div>
      </div>
    </div>
  )
}