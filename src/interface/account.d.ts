type AccountRedirects = 'account' | 'wallet' | 'order' | 'legal';

interface NavigationItem {
  id: string;
  redirect_url: string;
  text: string;
  value: AccountRedirects;
  icon: IconType;
}
