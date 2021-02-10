# cog-xp-calculator
Live at: https://cog-xp.netlify.app/

A calculator designed to add ease to the process of determining how much experience you need to grind on ToonTown Rewritten, an MMORPG, before gaining access to each of the four boss battles: Sellbot, Cashbot, Lawbot, and Bossbot. The logic is all coded in JavaScript, with a front-end made up of HTML and CSS. 

In-game, players have access to a page in their "Shticker Book" that displays how much experience they need in the form of a meter. In the case of this screenshot, the user would need 160 Stock Options total before they can take on the Bossbot boss, and their current number of Stock Options is 0.

![Bossbot tab in the Shticker Book in ToonTown Rewritten](https://static.wikia.nocookie.net/toontown/images/9/90/Bossbot_Cog_Suit.png/revision/latest/scale-to-width-down/340?cb=20101026013723)

The program takes two user inputs, one for how many total experience the player needs, and one for their current amount. The user input is validated, and if valid, the information is processed through a while loop. The webpage outputs how many instances the player should run to grind experience for maximum efficiency.
