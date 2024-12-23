import { AvatarImage, AvatarFallback, Avatar } from "../components/ui/avatar";
import { Card } from "../components/ui/card";

const Testimonial = () => {
  return (
    <div className="container mx-auto py-12" id="testimonial">
      <div className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          What our customers say
        </h2>
        <div className="overflow-hidden grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div>
            <Card className="p-6 bg-gray-50 dark:bg-gray-800 h-64">
              <div className="flex items-start gap-6">
                <Avatar>
                  <AvatarImage
                    alt="Olivia Davis"
                    src="/placeholder-avatar.jpg"
                  />
                  <AvatarFallback>OD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold">Olivia Davis</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      CEO, Acme Inc
                    </p>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                    </div>
                  </div>
                  <blockquote className="text-lg leading-relaxed">
                    "The customer service I received was exceptional. The
                    support team went above and beyond to address my concerns."
                  </blockquote>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card className="p-6 bg-gray-50 dark:bg-gray-800 h-64">
              <div className="flex items-start gap-6">
                <Avatar>
                  <AvatarImage
                    alt="Sarah Johnson"
                    src="/placeholder-avatar.jpg"
                  />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      CTO, Acme Inc
                    </p>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                    </div>
                  </div>
                  <blockquote className="text-lg leading-relaxed">
                    "The product is amazing and has exceeded my expectations.
                    The team is responsive, helpful and professional."
                  </blockquote>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card className="p-6 bg-gray-50 dark:bg-gray-800 h-64">
              <div className="flex items-start gap-6">
                <Avatar>
                  <AvatarImage alt="Alex Smith" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold">Alex Smith</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Head of Design, Acme Inc
                    </p>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                    </div>
                  </div>
                  <blockquote className="text-lg leading-relaxed">
                    "I've been using the product for a few months now and it's
                    been a game-changer for my business. Highly recommended!"
                  </blockquote>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Testimonial;
function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
