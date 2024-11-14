import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Landing/Header';
import Footer from '@/components/Landing/Footer';

export default function TermsOfService() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8 mt-16">Terms of Service</h1>
        <Card>
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p>By accessing and using Care Portal, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </CardContent>
        </Card>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>2. Use of Service</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You agree to use Care Portal for lawful purposes only and in a way that does not infringe the rights of, restrict or inhibit anyone else&apos;s use and enjoyment of the service.</p>
          </CardContent>
        </Card>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>3. Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your use of Care Portal is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the site and informs users of our data collection practices.</p>
          </CardContent>
        </Card>
        {/* Add more sections as needed */}
      </main>
      <Footer />
    </div>
  );
}