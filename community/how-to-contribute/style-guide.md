---
title: HexOS Documentation Style Guide
description: 
published: false
date: 2026-08-06T14:33:53.728Z
tags: 
editor: markdown
dateCreated: 2026-07-18T09:49:27.262Z
---

# HexOS documentation style guide

### Language

HexOS docs are written to be:

-   Friendly
-   Clear
-   Accessible to a wide variety of people including those with:

    -  first languages other than English
    -  different learning styles
    -  disabilities
    -  little or no experience of the subject matter

### Referring to user interface

When directly quoting from the HexOS user interface please follow the exact wording and capitalisation. Use bold for the words quoted. For example:

Click **Continue**

When describing navigation through a menu, each item should be in **bold** with a non-bold > between. For example: 

**Apps** > **Immich**


#### Referring to typed commands

In the rare occasion a command is described,this should use the inline code format `curl ipinfo.io/ip`



### **Terminology**

Here are the words used to describe the HexOS user interface and the methods of interacting with it.

-   Click
-   Screen
-   Menu
-   Card and tray
-   Info panel
-   Button
-   Dialogue
- 	Tab


#### Examples

Below is the **Processor card** in the **System tray.** 

Cards display extra information, in this case CPU usage and temperature. If it's just static text then it's a button, not a card.
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

For headings in the documentation, sentence case is used: the first letter of the first word is capitalised and otherwise only proper nouns are capitalised. This remains the same even if quoting from the UI.

#### Examples

-   **Import pools to HexOS** - the first letter and HexOS are capitalised but “pools” and “to” are not.
-   **Preparing server hardware** - only the first letter is capitalised
-   **The folders screen** \- “Folders” would usually be capitalised to follow UI, however headings are easier to read when they consistent, so even in this case lower case f is used.

### Call outs

Here are a range of stanard call out boxes for use within documneation with examples of their use. These are impornant for conistency for the reader.

To create this call out use the danger dropdown in the markdown editor which looks like this

`> Warning text is here
{.is-danger}`

> Warning text is here
> {.is-danger}

#### Danger

This call out is the most critical and is used mainly for situations which could cause data loss and other critical outcomes. For example:

> **Warning**: You must have backups of your data. Without adequate backups you could permanently lose data at several points during this process.
> {.is-danger}

#### Warning

This is for important risks or common pitfalls where, for example, time could be wasted or permenant changes made. For example

> **Warning.** Encryption can only be enabled during folder creation and cannot be disabled once the folder is created.
{.is-warning}

#### Requirement (success block quote)

The sucsess call out is for when an earlier stage or task is required for the next step to work correctly, but where danger or warning are not needed. For example:

> Make sure you have updated TrueNAS to the correct version before proceeding.
{.is-success}

#### Info
This for additional context or information that needs to be highlighted to users. Perhaps something they should know before starting a task or a common issue that is non-critical. For example:

> System folder locations can only be modified if no apps are are using them.
{.is-info}

#### Tip

This is for a helpful pointer for the reader. It may be in resonse to a common problem, missunderstanding or  pre-emptive troubleshooting step. For example:

> **Tip**: If boot fails, check that HexOS is at the top in your BIOS boot device order. The instructions are at the top of this guide.
{.is-tip}

#### Get help (troubleshooting call out)

This is for direct refrences to troubleshooting pages or links for get support directly. For example:

> If you have any doubts or questions, please [contact HexOS support](https://discord.com/invite/DjEp3WRHKz): this step is critical to get right.
{.is-troubleshooting}

#### Contribute 

This callout is used to thank community members who worked on a guide, or to encorage readers to get involved in working on HexOS documentaion writing. 

For example a thankyou should be added at the top of each community guide:

> Thanks to lnkd and ShinobiRen for the original guide
{.is-contribute}

And the following should be added to the bottom of each page:

> Help to improve HexOS documentation: [join the #Docs channel on discord](https://discord.com/invite/DjEp3WRHKz) today! Send feedback, suggestions or write contribute a guide.
{.is-contribute}


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

### Storage

[todo]

### Alt txt

[todo]

### Image styles

-   Light mode
-   Include something to orient the user e.g. menu, logo, side bar - especially in screenshots where the user is navigating
-   [TODO] What to pixelise?
-   [TODO] How to place in docs
-   [TODO] Organise in folder


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