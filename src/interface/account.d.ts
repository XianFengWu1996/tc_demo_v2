type AccountRedirects = 'personal' | 'wallet' | 'order' | 'legal' | 'contact';

interface NavigationItem {
  id: string;
  redirect_url: string;
  text: string;
  value: AccountRedirects;
  icon: IconType;
}
