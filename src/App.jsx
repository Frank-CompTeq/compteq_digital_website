import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Cloud, Zap, BarChart3, Database, ArrowRight, CheckCircle2, Menu, X } from 'lucide-react'
import './App.css'
import heroBg from './assets/hero-bg.jpg'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Cloud className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-slate-900">CompTeq Digital</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-slate-700 hover:text-blue-600 transition-colors">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-slate-700 hover:text-blue-600 transition-colors">About</button>
              <button onClick={() => scrollToSection('services')} className="text-slate-700 hover:text-blue-600 transition-colors">Services</button>
              <button onClick={() => scrollToSection('integrations')} className="text-slate-700 hover:text-blue-600 transition-colors">Integrations</button>
              <button onClick={() => scrollToSection('contact')} className="text-slate-700 hover:text-blue-600 transition-colors">Contact</button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-2">
                <button onClick={() => scrollToSection('home')} className="text-slate-700 hover:text-blue-600 transition-colors py-2">Home</button>
                <button onClick={() => scrollToSection('about')} className="text-slate-700 hover:text-blue-600 transition-colors py-2">About</button>
                <button onClick={() => scrollToSection('services')} className="text-slate-700 hover:text-blue-600 transition-colors py-2">Services</button>
                <button onClick={() => scrollToSection('integrations')} className="text-slate-700 hover:text-blue-600 transition-colors py-2">Integrations</button>
                <button onClick={() => scrollToSection('contact')} className="text-slate-700 hover:text-blue-600 transition-colors py-2">Contact</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 animate-fade-in">
              Transform Your Business with <span className="text-blue-600">Intelligent SaaS Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 animate-fade-in-up">
              We build scalable, high-performance software that automates, modernizes, and empowers your business to achieve measurable results.
            </p>
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg animate-fade-in-up"
              onClick={() => scrollToSection('contact')}
            >
              Schedule a Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Your Partner in Digital Transformation</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-slate-700 mb-6">
                CompTeq Digital is a Florida-based tech firm specializing in the design and development of SaaS solutions that help small and medium-sized businesses automate, scale, and modernize their operations.
              </p>
              <p className="text-lg text-slate-700 mb-6">
                Our mission is to empower businesses with intelligent cloud applications that connect accounting, finance, and technology. We believe that by simplifying complex workflows and providing data-driven insights, we can help our clients make smarter decisions and achieve their strategic goals.
              </p>
              <p className="text-lg text-slate-700">
                At CompTeq Digital, we are passionate about turning business challenges into scalable, high-performance software that drives measurable results. Our team of experts is dedicated to delivering innovative solutions that are tailored to the unique needs of each client.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Zap className="h-12 w-12 text-blue-600 mb-2" />
                  <CardTitle>Fast & Efficient</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Rapid development and deployment of solutions</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Cloud className="h-12 w-12 text-blue-600 mb-2" />
                  <CardTitle>Cloud-Native</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Built for scale and reliability</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Database className="h-12 w-12 text-blue-600 mb-2" />
                  <CardTitle>Data-Driven</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Insights that power decisions</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <BarChart3 className="h-12 w-12 text-blue-600 mb-2" />
                  <CardTitle>Measurable ROI</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Results you can track and optimize</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Expertise, Your Advantage</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We offer a comprehensive suite of services designed to help you build, integrate, and scale your business with intelligent software solutions.
            </p>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Cloud className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Custom SaaS Development</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We design and develop bespoke SaaS solutions that are tailored to your specific business needs. From initial concept to final deployment, we work closely with you to ensure that your software is scalable, secure, and user-friendly.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Business Process Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We help you automate your manual processes and streamline your workflows with intelligent automation solutions. Our expertise in AI-driven systems allows us to build sophisticated automation that saves you time, reduces errors, and improves efficiency.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Data Analytics & Business Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We help you unlock the power of your data with our advanced data analytics and business intelligence solutions. We build custom dashboards and reporting tools that provide you with real-time insights into your business performance.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Seamlessly Connected, Powerfully Integrated</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-slate-700 mb-6">
                We understand that your business relies on a variety of tools and platforms to operate effectively. That's why we specialize in building seamless integrations with leading platforms like QuickBooks, Salesforce, and Airtable.
              </p>
              <p className="text-lg text-slate-700 mb-6">
                Our intelligent cloud applications connect your accounting, finance, and technology systems, providing you with a unified view of your business operations. By breaking down data silos and automating data transfer, we help you save time, reduce errors, and make more informed decisions.
              </p>


            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Integration Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-slate-700">Unified data across all platforms</span>
                </li>
                <li className="flex items-center">
                  <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-slate-700">Automated data synchronization</span>
                </li>
                <li className="flex items-center">
                  <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-slate-700">Reduced manual data entry</span>
                </li>
                <li className="flex items-center">
                  <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-slate-700">Real-time insights and reporting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Let's Build the Future of Your Business, Together</h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us today to learn more about how we can help you transform your business with intelligent SaaS solutions.
          </p>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-6 text-white">
                <div>
                  <h4 className="font-semibold mb-2">Email</h4>
                  <p className="text-blue-100">info@compteqdigital.com</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Phone</h4>
                  <p className="text-blue-100">407-205-9645</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Location</h4>
                  <p className="text-blue-100">7901 4th St N, St. Petersburg, FL 33702</p>
                </div>
              </div>
              
              <div className="mt-8">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Cloud className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">CompTeq Digital</span>
              </div>
              <p className="text-slate-400">
                Transforming businesses with intelligent SaaS solutions.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Custom SaaS Development</li>
                <li>Business Automation</li>
                <li>Data Analytics</li>
              </ul>
            </div>
            

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 CompTeq Digital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

