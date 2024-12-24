import { AvatarImage, AvatarFallback, Avatar } from "../components/ui/avatar";
import { Card } from "../components/ui/card";

const Testimonial = () => {
  return (
    <div className="container mx-auto py-12" id="testimonial">
      <div className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          What Our Entrepreneurs Say
        </h2>
        <div className="overflow-hidden grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div>
            <Card className="p-6 bg-gray-50 dark:bg-gray-800 h-64">
              <div className="flex items-start gap-6">
                <Avatar>
                  <AvatarImage
                    alt="Naz Bibi"
                    src="/placeholder-avatar.jpg"
                  />
                  <AvatarFallback>NB</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold">Naz Bibi</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Traditional Embroidery
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
                    "This platform has transformed my business. I now reach customers I never thought possible!"
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
                    alt="Ayesha Ali"
                    src="/placeholder-avatar.jpg"
                  />
                  <AvatarFallback>AA</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold">Ayesha Ali</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Handwoven Textiles
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
                    "The support and resources provided have been invaluable. I feel empowered to grow my business!"
                  </blockquote>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card className="p-6 bg-gray-50 dark:bg-gray-800 h-64">
              <div className="flex items-start gap-6">
                <Avatar>
                  <AvatarImage alt="Fatima's Kitchen" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>FK</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold">Fatima's Kitchen</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Home-Made Delicacies
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
                    "I never imagined my recipes would reach so many people. This platform has made it possible!"
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
