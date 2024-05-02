import {ThemeTypes} from "../types/themeTypes/ThemeType.ts";

// Complete Dark Purple Theme
const PurpleThemeDark: ThemeTypes = {
    name: 'DarkPurpleTheme',
    dark: true,
    variables: {
        'border-color': '#333', // Adjust border color for better contrast
        'carousel-control-size': 10
    },
    colors: {
        primary: '#5e35b1', // Use a darker shade of primary
        secondary: '#212121', // Use dark gray for secondary
        info: '#00c853', // Lighter green for info
        success: '#009940', // Darker green for success
        accent: '#FFAB91', // Keep accent color
        warning: '#ffc107', // Keep warning color
        error: '#f44336', // Keep error color
        lightprimary: '#4267b2', // Darker shade of primary for highlights
        lightsecondary: '#373737', // Darker shade of secondary for highlights
        lightsuccess: '#7cb342', // Darker shade of success for highlights
        lighterror: '#e74c3c', // Darker shade of error for highlights
        lightwarning: '#ffeb3b', // Darker shade of warning for highlights
        darkText: '#fff', // White text for better contrast
        lightText: '#e0e0e0', // Light gray text for secondary text
        darkprimary: '#4527a0', // Darker shade of primary for pressed state
        darksecondary: '#1a1a1a', // Black for secondary pressed state
        borderLight: '#555', // Darker border color
        inputBorder: '#424242', // Darker input border
        containerBg: '#212121', // Dark background color
        surface: '#303030', // Slightly lighter background for elements
        'on-surface-variant': '#424242', // Darker variant for surface elements
        facebook: '#4267b2', // Keep facebook color
        twitter: '#1da1f2', // Keep twitter color
        linkedin: '#0e76a8', // Keep linkedin color
        gray100: '#424242', // Darker shade of gray for subtle backgrounds
        primary200: '#673ab7', // Darker shade of primary 200
        secondary200: '#4a4a4a', // Darker shade of secondary 200
    }
};

export { PurpleThemeDark };
