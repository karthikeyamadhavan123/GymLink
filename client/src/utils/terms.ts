import { TermsSection } from "@/types";

// Static terms data (will be fetched from DB later)
export const termsData: TermsSection[] = [
    {
        id: 'acceptance',
        title: 'Acceptance of Terms',
        icon: 'FileCheck',
        color: 'text-blue-400',
        content: [
            'By accessing and using our fitness platform, you agree to be bound by these Terms and Conditions and all applicable laws and regulations.',
            'If you do not agree with any part of these terms, you may not use our service.',
            'We reserve the right to update these terms at any time without prior notice. Your continued use of the service constitutes acceptance of any changes.'
        ]
    },
    {
        id: 'services',
        title: 'Service Description',
        icon: 'Dumbbell',
        color: 'text-green-400',
        content: [
            'Our platform provides fitness tracking, workout plans, nutrition guidance, and wellness resources.',
            'Services include personalized workout routines, progress tracking, community features, and expert advice.',
            'We strive to provide accurate information but do not guarantee specific fitness results.',
            'All content is for informational purposes and should not replace professional medical advice.'
        ]
    },
    {
        id: 'accounts',
        title: 'User Accounts',
        icon: 'User',
        color: 'text-purple-400',
        content: [
            'You are responsible for maintaining the confidentiality of your account credentials.',
            'You must provide accurate and complete information when creating your account.',
            'You are solely responsible for all activities that occur under your account.',
            'We reserve the right to suspend or terminate accounts that violate these terms.',
            'One person may not maintain multiple accounts without explicit permission.'
        ]
    },
    {
        id: 'health',
        title: 'Health and Safety',
        icon: 'Heart',
        color: 'text-red-400',
        content: [
            'Consult with a healthcare professional before starting any new fitness program.',
            'Our platform provides general fitness information and is not a substitute for professional medical advice.',
            'You participate in all fitness activities at your own risk and responsibility.',
            'Stop any exercise immediately if you experience pain, dizziness, or discomfort.',
            'We are not liable for any injuries or health issues that may result from using our platform.'
        ]
    },
    {
        id: 'privacy',
        title: 'Privacy and Data',
        icon: 'Shield',
        color: 'text-cyan-400',
        content: [
            'We collect and process your personal data in accordance with our Privacy Policy.',
            'Your fitness data, progress metrics, and personal information are protected using industry-standard security measures.',
            'We may use aggregated, anonymized data for research and service improvement purposes.',
            'You have the right to request access, modification, or deletion of your personal data.',
            'We do not sell your personal information to third parties.'
        ]
    },
    {
        id: 'content',
        title: 'Content and Intellectual Property',
        icon: 'Copyright',
        color: 'text-yellow-400',
        content: [
            'All content on our platform, including text, graphics, logos, and software, is our property or licensed to us.',
            'You may not reproduce, distribute, or create derivative works without explicit written permission.',
            'User-generated content remains your property, but you grant us a license to use it for platform operations.',
            'You are responsible for ensuring your content does not infringe on third-party rights.',
            'We reserve the right to remove any content that violates these terms.'
        ]
    },
    {
        id: 'payment',
        title: 'Payment and Subscriptions',
        icon: 'CreditCard',
        color: 'text-emerald-400',
        content: [
            'Subscription fees are billed in advance on a recurring basis according to your chosen plan.',
            'All payments are non-refundable except as expressly stated in our refund policy.',
            'We reserve the right to change subscription prices with 30 days advance notice.',
            'You may cancel your subscription at any time, with access continuing until the end of your billing period.',
            'Failed payments may result in suspension of premium features.'
        ]
    },
    {
        id: 'prohibited',
        title: 'Prohibited Uses',
        icon: 'XCircle',
        color: 'text-orange-400',
        content: [
            'You may not use our platform for any unlawful purpose or to solicit unlawful activity.',
            'Harassment, abuse, or threatening behavior toward other users is strictly prohibited.',
            'You may not attempt to gain unauthorized access to our systems or other user accounts.',
            'Sharing false or misleading health information is not permitted.',
            'Commercial use of our platform without authorization is prohibited.'
        ]
    },
    {
        id: 'limitation',
        title: 'Limitation of Liability',
        icon: 'AlertTriangle',
        color: 'text-pink-400',
        content: [
            'Our platform is provided "as is" without warranties of any kind, express or implied.',
            'We are not liable for any direct, indirect, incidental, or consequential damages.',
            'Our total liability shall not exceed the amount you paid for our services in the past 12 months.',
            'Some jurisdictions do not allow limitation of liability, so these limitations may not apply to you.',
            'You agree to indemnify us against any claims arising from your use of our platform.'
        ]
    },
    {
        id: 'termination',
        title: 'Termination',
        icon: 'LogOut',
        color: 'text-indigo-400',
        content: [
            'We may terminate or suspend your account immediately for any violation of these terms.',
            'You may terminate your account at any time by contacting our support team.',
            'Upon termination, your right to use our platform ceases immediately.',
            'Certain provisions of these terms will survive termination, including intellectual property rights and limitation of liability.',
            'We reserve the right to delete your data after account termination, subject to legal requirements.'
        ]
    }
];