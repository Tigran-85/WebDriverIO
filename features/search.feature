Feature: With Valid input

    Scenario Outline:  Check Search functionality for "ԲՈԼՈՐԸ" option

        Given Open web page
        When Navigate to Search field
        When Enter Name <value1>
        When Click on Search icon or click enter
        Then Products should be found with success message <message>
        When Click on first item apears on the screen
        Then Products with the Apple name should be found in title <value1> <value2>

        Examples:
            | value1    | value2 | message                                               |
            | apple     | խնձոր  | Ձեր որոնման արդյունքում գտնվել են հետևյալ ապրանքները: |
            | Red Apple | խնձոր  | Ձեր որոնման արդյունքում գտնվել են հետևյալ ապրանքները: |