-- Create properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  price DECIMAL(15,2) NOT NULL,
  price_display TEXT NOT NULL,
  beds INTEGER NOT NULL DEFAULT 0,
  baths INTEGER NOT NULL DEFAULT 0,
  sqft TEXT NOT NULL,
  property_type TEXT NOT NULL DEFAULT 'apartment',
  image_url TEXT,
  images TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create viewing_requests table
CREATE TABLE public.viewing_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for admin users
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.viewing_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Properties policies (public read, admin write)
CREATE POLICY "Properties are viewable by everyone" 
ON public.properties FOR SELECT USING (true);

CREATE POLICY "Admins can insert properties" 
ON public.properties FOR INSERT 
WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

CREATE POLICY "Admins can update properties" 
ON public.properties FOR UPDATE 
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

CREATE POLICY "Admins can delete properties" 
ON public.properties FOR DELETE 
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Viewing requests policies (anyone can create, admins can read all)
CREATE POLICY "Anyone can create viewing requests" 
ON public.viewing_requests FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all viewing requests" 
ON public.viewing_requests FOR SELECT 
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

CREATE POLICY "Admins can update viewing requests" 
ON public.viewing_requests FOR UPDATE 
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Profiles policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample properties
INSERT INTO public.properties (title, description, location, price, price_display, beds, baths, sqft, property_type, image_url, amenities, featured) VALUES
('Sky High Penthouse', 'Luxurious penthouse with breathtaking city views. Floor-to-ceiling windows, private terrace, and world-class amenities.', 'Manhattan, New York', 8500000, '$8.5M', 4, 5, '4,500 sq ft', 'penthouse', '/placeholder.svg', ARRAY['Rooftop Terrace', 'Private Elevator', 'Smart Home', 'Concierge', 'Gym'], true),
('Ocean View Villa', 'Stunning beachfront villa with panoramic ocean views. Modern architecture meets coastal living.', 'Malibu, California', 12300000, '$12.3M', 5, 6, '6,200 sq ft', 'villa', '/placeholder.svg', ARRAY['Private Beach', 'Infinity Pool', 'Wine Cellar', 'Home Theater', 'Guest House'], true),
('Alpine Mountain Chalet', 'Magnificent mountain retreat with ski-in/ski-out access. Rustic elegance with modern luxury.', 'Aspen, Colorado', 9800000, '$9.8M', 6, 7, '7,800 sq ft', 'mansion', '/placeholder.svg', ARRAY['Ski-in/Ski-out', 'Hot Tub', 'Fireplace', 'Game Room', 'Sauna'], true),
('Urban Industrial Loft', 'Converted warehouse loft with exposed brick and soaring ceilings. Prime Brooklyn location.', 'Brooklyn, New York', 3200000, '$3.2M', 3, 3, '3,200 sq ft', 'apartment', '/placeholder.svg', ARRAY['Exposed Brick', 'High Ceilings', 'Rooftop Access', 'Parking', 'Storage'], true);