---
title: HexOS Documentation Style Guide
description: 
published: false
date: 2026-07-29T14:35:53.070Z
tags: 
editor: markdown
dateCreated: 2026-07-18T09:49:27.262Z
---

# HexOS Documentation Style Guide

### Language

HexOS docs are written to be:

-   Friendly and Open
-   Clear
-   Accessible to a wide variety of people including people who:
    -   have a wide range of technical skills and interests
    -   their first language is not English
    -   have different learning styles
    -   have a disability

### Referring to the user interface

When directly quoting from the HexOS user interface please follow the exact wording and capitalisation with the bold the words quoted. For example

Click **Continue**

When describing a navigation process, each item should be in **bold** with a non-bold > between. For example: 

**Apps** > **Immich**

### **Terminology**

Here are some quick key terms to use, instead of their various alternatives. For example click is used over tap and screen is used rather than page.

-   Click
-   Screen
-   Dialogue
-   Menu
-   Card and tray
-   Info panel
-   Button

#### Examples

Below is the **Processor card** in the **System tray.** 

Cards display extra information, in this case CPU usage and temperature. If it's just static text it's a button, not a card.
<details>
  <summary> System tray and tiles </summary>
  
![Image showing the system tray and tiles](/card-in-system-tray.png)
  </details>

Clicking the **Processor card** opens the **Processor info panel**

<details>
  <summary> Processor info panel</summary>
  
![Processor info panel](/processor-info-pannel.png)

  </details>
  
Click the **New Folder** button
<details>
  <summary> New folder button </summary>
  
![Image showing the new folder button being clicked](/new-folder-button.png)

  </details>

This opens the **Create folder** dialogue. Click the **Access** tab.
<details>
  <summary> Dialogue and tab </summary>

![create-folder-dialogue.png](/create-folder-dialogue.png)

</details>


### Capitalisation

HexOS and TrueNAS are capitalised like this. 

For headings in the documentation, sentence case is used: the first letter of the first word is capitalised and otherwise only proper nouns are capitalised. 

-   **Import pools to HexOS** - the first letter and HexOS are capitalised but “pools” and “to” are not.
-   **Preparing server hardware** - only the first letter is capitalised
-   **The folders screen** \- in this example the word “Folders” would usually be capitalised as it is capitalised in the UI. However the headings are easier to read when capitalisation is very consistent, so even in this case lower case is used.

### Call outs

> This is blockquote

> This is info
{.is-info}

> This is sucsess
{.is-success}

> This is warning
{.is-warning}

> This is error
{.is-danger}

> This is new one
{.is-new}


### Writing accessibly

Some ways of writing are much simpler to translate and easier to understand for non-native English speakers. We can avoid phrases which, while feeling natural to native English speakers, can be confusing when translated literally or read by people with a different language background or cultural references.

#### Metaphors

"HexOS is your gateway to self-hosting" > "HexOS makes self-hosting easier"

The word "gateway" is being used figuratively and reader may understand the individual words but not the intended meaning.

#### Turns of phrase and idioms

“HexOS is running TrueNAS under the hood” > “HexOS runs on top of TrueNAS”

The phrase "under the hood" is an idiom borrowed from cars meaning something hidden/working the background. This meaning may not be obvious to all readers.

#### Pop culture references

"Type the password and open sesame! Your files will appear." > "Type the password and you will see your files."

"Open sesame", from *Ali Baba and the Forty Thieves*, is often used to decisive something magically opening. However, readers unfamiliar with this cultural reference may be wondering why sesame seeds are involved in their NAS setup!

## Screenshots

### Alt txt

#### Image styles

-   Light mode
-   Include something to orient the user e.g. menu, logo, side bar - especially in screenshots where the user is navigating
-   What to pixelise?
-   How to place in docs

[TODO] rewrite this is we remove the visual editor

Always set an Alt Text for each image. This should be written in a concise and simple way:

“Create Folder dialogue and Access tab being clicked” is preferable to than “Image showing the create folder dialogue and the user is clicking on the access tab”

The Alt Txt allows people with visual impairments to understand what is in the image. With no alt text, screen readers will either skip the image or say “image”. 

To add the Alt Text, insert the image and then right click it and click the Change image text alternative button (eyeball icon). Then enter the text and hit enter.

<details>
  <summary> Alt text button</summary>
  
![Alt text button](/alt-text-adding.png)
    </details>

## Licence

[TODO] What licence is it published under etc, that would be applied to the contributions

**Licence** that would be applied to the contributions