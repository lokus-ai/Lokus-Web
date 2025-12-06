import React from 'react';

export default function MarketplaceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            {/* Marketplace specific header or sidebar could go here - Updated */}
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
