import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Landing/Header';
import Footer from '@/components/Landing/Footer';

export default function Disclaimer() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8 mt-16">Disclaimer</h1>
        <Card>
          <CardHeader>
            <CardTitle>1. Not a Substitute for Professional Medical Advice</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The information provided by Care Portal is for general informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.</p>
          </CardContent>
        </Card>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>2. No Doctor-Patient Relationship</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Use of Care Portal does not create a doctor-patient relationship. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
          </CardContent>
        </Card>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>3. Emergency Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p>If you think you may have a medical emergency, call your doctor or emergency services immediately. Care Portal does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on the site.</p>
          </CardContent>
        </Card>
        {/* Add more sections as needed */}
      </main>
      <Footer />
    </div>
  );
}