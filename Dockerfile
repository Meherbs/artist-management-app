FROM php:7.4-apache
 
# … cut for readability
 
COPY docker/apache.conf /etc/apache2/sites-enabled/000-default.conf
COPY docker/entrypoint.sh /entrypoint.sh
 
# … cut for readability
 
RUN chmod +x /entrypoint.sh
 
CMD ["apache2-foreground"]
 
ENTRYPOINT ["/entrypoint.sh"]