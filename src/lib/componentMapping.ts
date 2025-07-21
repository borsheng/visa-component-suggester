/**
 * Visa Product Design System Component Suggester
 * Central repository of VPDS React component snippets based on official documentation.
 * Each entry contains import statements and JSX usage examples.
 */

// ========================================
// COMPONENT SNIPPETS
// ========================================

export const componentSnippets = {
  // ---------- FORM COMPONENTS ----------
  Input: `import { Input, InputContainer, Label, Utility } from '@visa/nova-react';

<Utility vFlex vFlexCol vGap={4}>
  <Label htmlFor="input">Label</Label>
  <InputContainer>
    <Input id="input" type="text" aria-required="true" />
  </InputContainer>
</Utility>`,

  PasswordInput: `import { VisaPasswordHideTiny, VisaPasswordShowTiny } from '@visa/nova-icons-react';
import { Button, Input, InputContainer, Label, Utility } from '@visa/nova-react';

<Utility vFlex vFlexCol vGap={4}>
  <Label htmlFor="password">Password</Label>
  <InputContainer>
    <Input id="password" type="password" aria-required="true" />
    <Button
      aria-label="toggle password visibility"
      buttonSize="small"
      colorScheme="tertiary"
      iconButton
    >
      <VisaPasswordShowTiny />
    </Button>
  </InputContainer>
</Utility>`,

  EmailInput: `import { Input, InputContainer, Label, Utility } from '@visa/nova-react';

<Utility vFlex vFlexCol vGap={4}>
  <Label htmlFor="email">Email</Label>
  <InputContainer>
    <Input id="email" type="email" aria-required="true" />
  </InputContainer>
</Utility>`,

  SearchInput: `import { VisaSearchTiny } from '@visa/nova-icons-react';
import { Input, InputContainer, Label, Utility } from '@visa/nova-react';

<Utility vFlex vFlexCol vGap={4}>
  <Label htmlFor="search">Search</Label>
  <InputContainer>
    <Utility vFlex vFlexCol>
      <VisaSearchTiny />
    </Utility>
    <Input id="search" type="search" placeholder="Search..." />
  </InputContainer>
</Utility>`,

  Textarea: `import { InputContainer, Label, Textarea, Utility } from '@visa/nova-react';

<Utility vFlex vFlexCol vGap={4}>
  <Label htmlFor="textarea">Description</Label>
  <InputContainer className="v-flex-row">
    <Textarea id="textarea" aria-required="true" />
  </InputContainer>
</Utility>`,

  Button: `import { Button } from '@visa/nova-react';

<Button>Primary action</Button>`,

  SecondaryButton: `import { Button } from '@visa/nova-react';

<Button colorScheme="secondary">Secondary action</Button>`,

  SubmitButton: `import { Button } from '@visa/nova-react';

<Button type="submit">Submit</Button>`,

  Checkbox: `import { Checkbox, Label, Utility } from '@visa/nova-react';

<Utility vAlignItems="center" vFlex vGap={2}>
  <Checkbox id="checkbox" />
  <Label htmlFor="checkbox">Remember me</Label>
</Utility>`,

  Radio: `import { Radio, Label, Utility } from '@visa/nova-react';

<fieldset>
  <legend>Choose an option</legend>
  <Utility vFlex vFlexCol vGap={2}>
    <Utility vAlignItems="center" vFlex vGap={2}>
      <Radio id="option1" name="options" />
      <Label htmlFor="option1">Option 1</Label>
    </Utility>
    <Utility vAlignItems="center" vFlex vGap={2}>
      <Radio id="option2" name="options" />
      <Label htmlFor="option2">Option 2</Label>
    </Utility>
  </Utility>
</fieldset>`,

  Select: `import { Label, Select, Utility } from '@visa/nova-react';

<Utility vFlex vFlexCol vGap={4}>
  <Label htmlFor="select">Choose option</Label>
  <Select id="select" aria-required="true">
    <option value="">Select an option</option>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
  </Select>
</Utility>`,

  // ---------- LAYOUT COMPONENTS ----------
  ContentCard: `import { ContentCard, ContentCardBody, ContentCardTitle } from '@visa/nova-react';

<ContentCard>
  <ContentCardBody>
    <ContentCardTitle variant="headline-4">Card Title</ContentCardTitle>
    <p>Card content goes here</p>
  </ContentCardBody>
</ContentCard>`,

  Panel: `import { Panel, PanelBody, PanelHeader } from '@visa/nova-react';

<Panel>
  <PanelHeader>Panel Title</PanelHeader>
  <PanelBody>
    Panel content goes here
  </PanelBody>
</Panel>`,

  Divider: `import { Divider } from '@visa/nova-react';

<Divider />`,

  // ---------- NAVIGATION ----------
  Breadcrumbs: `import { Breadcrumbs, BreadcrumbsItem, Link } from '@visa/nova-react';

<Breadcrumbs>
  <BreadcrumbsItem>
    <Link href="/">Home</Link>
  </BreadcrumbsItem>
  <BreadcrumbsItem>
    <Link href="/products">Products</Link>
  </BreadcrumbsItem>
  <BreadcrumbsItem>Current Page</BreadcrumbsItem>
</Breadcrumbs>`,

  Tabs: `import { Tab, TabContent, TabList, Tabs } from '@visa/nova-react';

<Tabs>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab>Tab 3</Tab>
  </TabList>
  <TabContent>Content for Tab 1</TabContent>
  <TabContent>Content for Tab 2</TabContent>
  <TabContent>Content for Tab 3</TabContent>
</Tabs>`,

  // ---------- FEEDBACK ----------
  Banner: `import { Banner } from '@visa/nova-react';

<Banner>
  Important notification message
</Banner>`,

  SectionMessage: `import { SectionMessage } from '@visa/nova-react';

<SectionMessage>
  Information message for users
</SectionMessage>`,

  Badge: `import { Badge } from '@visa/nova-react';

<Badge>New</Badge>`,

  // ---------- USER INTERFACE ----------
  Avatar: `import { Avatar } from '@visa/nova-react';

<Avatar alt="User Name" src="/user-avatar.jpg" />`,

  Tooltip: `import { Button, Tooltip } from '@visa/nova-react';

<Tooltip content="Helpful tooltip text">
  <Button>Hover me</Button>
</Tooltip>`,

  Dialog: `import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, DialogTitle } from '@visa/nova-react';

<Dialog>
  <DialogHeader>
    <DialogTitle>Dialog Title</DialogTitle>
  </DialogHeader>
  <DialogBody>
    Dialog content goes here
  </DialogBody>
  <DialogFooter>
    <Button>Confirm</Button>
    <Button colorScheme="secondary">Cancel</Button>
  </DialogFooter>
</Dialog>`,

  // ---------- INTERACTIVE ----------
  Accordion: `import { Accordion, AccordionItem } from '@visa/nova-react';

<Accordion>
  <AccordionItem title="Section 1">
    Content for section 1
  </AccordionItem>
  <AccordionItem title="Section 2">
    Content for section 2
  </AccordionItem>
</Accordion>`,

  Switch: `import { Label, Switch, Utility } from '@visa/nova-react';

<Utility vAlignItems="center" vFlex vGap={2}>
  <Switch id="switch" />
  <Label htmlFor="switch">Enable feature</Label>
</Utility>`,

  Slider: `import { Label, Slider, Utility } from '@visa/nova-react';

<Utility vFlex vFlexCol vGap={4}>
  <Label htmlFor="slider">Volume</Label>
  <Slider id="slider" min={0} max={100} defaultValue={50} />
</Utility>`,

  // ---------- DATA DISPLAY ----------
  Table: `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@visa/nova-react';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>`,

  Progress: `import { Progress } from '@visa/nova-react';

<Progress value={75} max={100} aria-label="Loading progress" />`,

  Pagination: `import { Pagination, PaginationItem } from '@visa/nova-react';

<Pagination>
  <PaginationItem disabled>Previous</PaginationItem>
  <PaginationItem active>1</PaginationItem>
  <PaginationItem>2</PaginationItem>
  <PaginationItem>3</PaginationItem>
  <PaginationItem>Next</PaginationItem>
</Pagination>`,

} as const;

export type ComponentName = keyof typeof componentSnippets;

// ========================================
// SMART KEYWORD MAPPING
// ========================================

/** Precise keyword to component mapping for better suggestions */
export const keywordMap: Record<string, ComponentName[]> = {
  // Authentication & Login
  'login': ['EmailInput', 'PasswordInput', 'Checkbox', 'SubmitButton'],
  'signin': ['EmailInput', 'PasswordInput', 'Checkbox', 'SubmitButton'],
  'sign in': ['EmailInput', 'PasswordInput', 'Checkbox', 'SubmitButton'],
  'authentication': ['EmailInput', 'PasswordInput', 'SubmitButton'],
  'auth': ['EmailInput', 'PasswordInput', 'SubmitButton'],
  
  // Registration & Signup
  'signup': ['Input', 'EmailInput', 'PasswordInput', 'Checkbox', 'SubmitButton'],
  'register': ['Input', 'EmailInput', 'PasswordInput', 'Checkbox', 'SubmitButton'],
  'registration': ['Input', 'EmailInput', 'PasswordInput', 'Checkbox', 'SubmitButton'],
  'sign up': ['Input', 'EmailInput', 'PasswordInput', 'Checkbox', 'SubmitButton'],
  
  // Form Elements
  'form': ['Input', 'Button'],
  'contact form': ['Input', 'EmailInput', 'Textarea', 'SubmitButton'],
  'search': ['SearchInput', 'Button'],
  'search form': ['SearchInput', 'Button'],
  'filter': ['Input', 'Select', 'Checkbox', 'Button'],
  
  // Specific Inputs
  'input': ['Input'],
  'text': ['Input'],
  'textbox': ['Input'],
  'field': ['Input'],
  'email': ['EmailInput'],
  'password': ['PasswordInput'],
  'textarea': ['Textarea'],
  'description': ['Textarea'],
  'message text': ['Textarea'],
  'comment': ['Textarea'],
  
  // Buttons & Actions
  'button': ['Button'],
  'submit': ['SubmitButton'],
  'action': ['Button'],
  'cta': ['Button'],
  'primary': ['Button'],
  'secondary': ['SecondaryButton'],
  
  // Selection
  'checkbox': ['Checkbox'],
  'check': ['Checkbox'],
  'remember': ['Checkbox'],
  'agree': ['Checkbox'],
  'terms': ['Checkbox'],
  'radio': ['Radio'],
  'option': ['Radio'],
  'choice': ['Radio'],
  'select': ['Select'],
  'dropdown': ['Select'],
  'picker': ['Select'],
  'switch': ['Switch'],
  'toggle': ['Switch'],
  'slider': ['Slider'],
  'range': ['Slider'],
  
  // Layout & Content
  'card': ['ContentCard'],
  'content': ['ContentCard'],
  'panel': ['Panel'],
  'section': ['Panel'],
  'container': ['Panel'],
  'divider': ['Divider'],
  'separator': ['Divider'],
  'line': ['Divider'],
  
  // Navigation
  'navigation': ['Breadcrumbs', 'Tabs'],
  'nav': ['Breadcrumbs', 'Tabs'],
  'breadcrumb': ['Breadcrumbs'],
  'breadcrumbs': ['Breadcrumbs'],
  'tab': ['Tabs'],
  'tabs': ['Tabs'],
  'menu': ['Tabs'],
  
  // Feedback & Notifications
  'banner': ['Banner'],
  'notification': ['Banner', 'SectionMessage'],
  'alert': ['Banner', 'SectionMessage'],
  'message': ['SectionMessage'],
  'info': ['SectionMessage'],
  'warning': ['Banner'],
  'error': ['Banner'],
  'success': ['Banner'],
  'badge': ['Badge'],
  'label': ['Badge'],
  'tag': ['Badge'],
  
  // User Interface
  'avatar': ['Avatar'],
  'profile': ['Avatar', 'ContentCard', 'Button'],
  'user': ['Avatar'],
  'photo': ['Avatar'],
  'image': ['Avatar'],
  'tooltip': ['Tooltip'],
  'help': ['Tooltip'],
  'hint': ['Tooltip'],
  'dialog': ['Dialog'],
  'modal': ['Dialog'],
  'popup': ['Dialog'],
  'overlay': ['Dialog'],
  
  // Interactive
  'accordion': ['Accordion'],
  'collapse': ['Accordion'],
  'expand': ['Accordion'],
  'faq': ['Accordion'],
  
  // Data Display
  'table': ['Table'],
  'list': ['Table'],
  'data': ['Table'],
  'grid': ['Table'],
  'progress': ['Progress'],
  'loading': ['Progress'],
  'status': ['Progress', 'Badge'],
  'pagination': ['Pagination'],
  'paging': ['Pagination'],
  'pages': ['Pagination'],
  
  // Common UI Patterns
  'dashboard': ['ContentCard', 'Banner', 'Table', 'Progress'],
  'admin': ['Table', 'Button', 'Banner', 'Pagination'],
  'settings': ['Input', 'Switch', 'Select', 'Button'],
  'preferences': ['Switch', 'Select', 'Checkbox', 'Button'],
  'profile page': ['Avatar', 'Input', 'Button', 'Divider'],
  'user profile': ['Avatar', 'Input', 'Button'],
  'account': ['Input', 'EmailInput', 'PasswordInput', 'Button'],
  'checkout': ['Input', 'Select', 'Checkbox', 'SubmitButton'],
  'payment': ['Input', 'Select', 'SubmitButton'],
  'billing': ['Input', 'Select', 'Checkbox', 'SubmitButton'],
};

/** UI Pattern combinations for complex queries */
export const uiPatterns: Record<string, ComponentName[]> = {
  'login form': ['EmailInput', 'PasswordInput', 'Checkbox', 'SubmitButton'],
  'registration form': ['Input', 'EmailInput', 'PasswordInput', 'Checkbox', 'SubmitButton'],
  'contact form': ['Input', 'EmailInput', 'Textarea', 'SubmitButton'],
  'search form': ['SearchInput', 'Button'],
  'user profile': ['Avatar', 'Input', 'EmailInput', 'Button'],
  'settings page': ['Input', 'Switch', 'Select', 'Button'],
  'admin dashboard': ['ContentCard', 'Table', 'Banner', 'Pagination'],
  'data table': ['Table', 'SearchInput', 'Pagination'],
  'filter form': ['Input', 'Select', 'Checkbox', 'Button'],
  'checkout form': ['Input', 'Select', 'Checkbox', 'SubmitButton'],
  'feedback form': ['Input', 'Textarea', 'Radio', 'SubmitButton'],
  'survey form': ['Input', 'Radio', 'Checkbox', 'Textarea', 'SubmitButton'],
};

/** Fallback components for unmatched queries */
export const fallbackComponents: ComponentName[] = ['Input', 'Button'];

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Enhanced component detection with phrase matching and pattern recognition
 */
export function detectComponents(query: string): ComponentName[] {
  const normalizedQuery = query.toLowerCase().trim();
  const suggestions = new Set<ComponentName>();
  
  // First, check for exact UI patterns
  for (const [pattern, components] of Object.entries(uiPatterns)) {
    if (normalizedQuery.includes(pattern)) {
      components.forEach(component => suggestions.add(component));
    }
  }
  
  // If no patterns matched, use keyword mapping
  if (suggestions.size === 0) {
    const words = normalizedQuery.split(/\s+/);
    
    words.forEach(word => {
      // Exact keyword match
      if (keywordMap[word]) {
        keywordMap[word].forEach(component => suggestions.add(component));
      }
      
      // Partial keyword match
      Object.entries(keywordMap).forEach(([keyword, components]) => {
        if (keyword.includes(word) || word.includes(keyword)) {
          components.forEach(component => suggestions.add(component));
        }
      });
    });
  }
  
  // Return suggestions or fallback
  return suggestions.size > 0 ? Array.from(suggestions) : fallbackComponents;
}
