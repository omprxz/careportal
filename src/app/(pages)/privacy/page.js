import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Landing/Header';
import Footer from '@/components/Landing/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8 mt-16">Privacy Policy</h1>
        <Card>
          <CardHeader>
            <CardTitle>1. Information We Collect</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We collect information you provide directly to us, such as when you create or modify your account, request services, contact customer support, or otherwise communicate with us.</p>
          </CardContent>
        </Card>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>2. How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect Care Portal and our users.</p>
          </CardContent>
        </Card>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>3. Sharing of Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We may share the information we collect with third parties for various purposes, including to provide and improve our services, for legal reasons, and in connection with a sale or transfer of our business.</p>
          </CardContent>
        </Card>
        {/* Add more sections as needed */}
      </main>
      <Footer />
    </div>
  );
}