
import React from 'react';
import Card from '../atoms/Card';
import Button from '../atoms/Button';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  available24h?: boolean;
}

interface ServiceCardProps {
  service: Service;
  onLearnMore: (serviceId: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onLearnMore }) => {
  return (
    <Card premium hover className="p-6 h-full flex flex-col">
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary p-0.5 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
        <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
          {service.icon}
        </div>
      </div>

      {/* Content */}
      <div className="text-center flex-grow">
        <h3 className="text-xl font-semibold text-foreground mb-3">
          {service.title}
        </h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3 flex-shrink-0"></div>
              {feature}
            </li>
          ))}
        </ul>

        {/* 24/7 Badge */}
        {service.available24h && (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
            <div className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse-soft"></div>
            Available 24/7
          </div>
        )}
      </div>

      {/* Action */}
      <Button 
        variant="outline" 
        size="md" 
        className="w-full mt-auto"
        onClick={() => onLearnMore(service.id)}
      >
        Learn More
      </Button>
    </Card>
  );
};

export default ServiceCard;
