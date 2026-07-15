The year templates for the newsletter were mass created using code. To effectively use this template I have made, please follow these steps. This ensures everything remains uniform, as the functionality within ParentSquare Smart Sites to effectively do this is limited.

1. Create a new Columns element. Drag it so that it is above the previous year’s element but below the page heading element.
2. Edit the Component Title to have the year range, e.g. “2026-2027”.
3. Edit the Optional Component Heading to match.
4. In the Content box (this), click Source to see the source code for the element content.
5. Select and clear all previous content in the Source view if any.
6. Paste the following template for a table with 1 newsletter:

   ```html
       <table align="center" border="0" cellpadding="1" cellspacing="1">
           <tbody>
               <tr>
                   <td style="text-align: center; vertical-align: middle;">
                       <a href="https://files.smartsites.parentsquare.com/4790/2025_vs30_fall_nl_11_11_mm_single_pages_final.pdf" target="_blank">
                           <img src="https://faisaln.com/share/1784150991.png" alt="2025 Fall Newsletter"></img>
                       </a>
                   </td>
               </tr>
           </tbody>
       </table>
   ```

8. We can see that we have a generic table structure – centered, padded, and spaced – without borders.
9. Then, look at the row starting with `<td>` to the row starting with `</td>`. This represents one cell of the row – one newsletter.
10. You can easily duplicate the cell by copying the lines and pasting them right after the previous.
11. We can easily identify 3 components of the cell: the PDF link, the cover image, and the newsletter title.
12. Simply update those strings with your new newsletter’s. Note that the PDF and cover image must be uploaded to a server (whether ParentSquare’s or another) and it must be publicly accessible so that the files can be viewed. Links to files on Google Drive are not permitted.

If you have any questions about this process, feel free to contact me (Faisal Nageer) at [contact@faisaln.com](contact@faisaln.com), or until 8/18/26 at [fnageer@vs30.org](fnageer@vs30.org).

Please do not edit or remove this text, so that it can be preserved for admins who may find this in the future.

This is also accessible at [https://github.com/valleystream30/www/blob/main/docs/newsletters.md](https://github.com/valleystream30/www/blob/main/docs/newsletters.md).