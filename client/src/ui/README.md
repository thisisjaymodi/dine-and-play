# UI Primitives

This directory contains the core, reusable UI components for the application. These components are built on top of **DaisyUI** and **Tailwind CSS**.

**Guideline:** Always use these primitives instead of raw HTML elements to ensure consistency in design, spacing, and accessibility.

## Available Components

### `Button`
A versatile button component that handles standard clicks, links, and loading states.

-   **Props**:
    -   `variant`: `primary` (default), `secondary`, `accent`, `ghost`, `link`, `error`.
    -   `size`: `xs`, `sm`, `md` (default), `lg`.
    -   `outline`: `boolean` (transparent background with colored border).
    -   `wide`: `boolean` (adds `btn-wide`).
    -   `loading`: `boolean` (shows spinner, disables interaction).
    -   `to`: `string` (renders as React Router `Link`).
    -   `href`: `string` (renders as native `<a>`).
    -   `startIcon`: `ReactNode`.
-   **Usage**:
    ```jsx
    <Button variant="primary" onClick={doSomething}>Click Me</Button>
    <Button to="/dashboard" variant="ghost">Go Home</Button>
    ```

### `Input`
A standardized form input field with built-in label, error handling, and icon support.

-   **Props**:
    -   `label`: `string` (Top-left label text).
    -   `labelRight`: `ReactNode` (Top-right label text, e.g., "Forgot Password?").
    -   `error`: `string` (Displays error message in red below input).
    -   `startIcon`: `ReactNode` (Icon inside the input on the left).
    -   `type`: `text`, `password`, `email`, etc.
    -   `placeholder`: `string`.
-   **Usage**:
    ```jsx
    <Input
      label="Email Address"
      type="email"
      placeholder="user@example.com"
      startIcon={<FaEnvelope />}
      error={errors.email}
      {...register('email')}
    />
    ```

### `Card`
A wrapper for content with consistent background, standard padding, and optional variations.

-   **Props**:
    -   `variant`: `default`, `bordered`, `compact` (less padding), `side` (image on side).
    -   `className`: Classes for wrapper.
    -   `bodyClassName`: Classes for the inner `card-body`.
-   **Usage**:
    ```jsx
    <Card variant="bordered">
      <h2 className="card-title">Card Title</h2>
      <p>Content goes here.</p>
    </Card>
    ```

### `Badge`
Small status indicators or tags.

-   **Props**:
    -   `variant`: `primary`, `secondary`, `accent`, `ghost`, `success`, `error`, `warning`, `info`.
    -   `size`: `xs`, `sm`, `md`, `lg`.
-   **Usage**:
    ```jsx
    <Badge variant="success">Active</Badge>
    <Badge variant="ghost" size="sm">Tag</Badge>
    ```

### `StatCard`
A simple component to display a metric with a label.

-   **Props**:
    -   `value`: `string` (The large number/text).
    -   `label`: `string` (The subtitle).
-   **Usage**:
    ```jsx
    <StatCard value="1,204" label="Total Users" />
    ```

## Styling

All components accept a `className` prop which is merged with the base classes using `clsx`. Use this for one-off spacing or positioning tweaks (e.g., `className="mt-4"`).
