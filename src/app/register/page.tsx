import type { Metadata } from 'next';
import RegisterPageClient from './RegisterPageClient';

export const metadata: Metadata = {
  title: 'Register - Wedzway | Create Your Account',
  description: 'Create your Wedzway account to start planning your dream destination wedding. Connect with verified wedding planners, discover stunning venues, and access exclusive wedding services worldwide.',
  keywords: 'wedzway register, create account, destination wedding planning, wedding planner signup, wedding services registration, wedding venue booking account',
  openGraph: {
    title: 'Register - Wedzway | Create Your Account',
    description: 'Create your Wedzway account to start planning your dream destination wedding. Connect with verified wedding planners and discover stunning venues worldwide.',
    type: 'website',
    url: 'https://wedzway.com/register',
  },
};

export default function RegisterPage() {
  return <RegisterPageClient />;
}
